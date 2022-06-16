const express = require('express');
const fs = require('fs');
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

// CREATE AUDIENCE
const createAudiance = async (data) => {
  const { userName, footerContactInfo, campaignDefaults } = data;

  // const footerContactInfo = { company, address1: address, city, state, zip, country };

  // const campaignDefaults = { from_name, from_email, subject, language };
  try {
    const audience = await mailchimp.lists.createList({
      name: userName,
      contact: footerContactInfo,
      permission_reminder: '*|LIST:DESCRIPTION|*',
      email_type_option: true,
      campaign_defaults: campaignDefaults,
    });

    res.send(audience.id);
  } catch (err) {
    res.status(400).send(err);
  }
};

// ADD LIST MEMBER ONE BY ONE
const addListMember = async (data) => {
  const { listId, firstname, lastname, email, tag } = data;

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      email_type: 'html',
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname,
      },
      tags: [tag],
    });
    res.send(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

// BATCH LIST MEMBER (ADD MULTIPLE LIST MEMBER)
const addMultipleMembers = async (data) => {
  const { listId, members } = data;

  const membersList = [];
  members.forEach((member) => {
    const memberDetails = {
      email_address: member.email_address,
      email_type: 'html',
      status: 'subscribed',
      merge_fields: {
        FNAME: member.firstname,
        LNAME: member.lastname,
      },
    };
    membersList.push(memberDetails);
  });

  try {
    const response = await mailchimp.lists.batchListMembers(listId, {
      members: membersList,
      update_existing: true,
    });
    res.send(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

// CREATE SEGMENT (GROUPING AUDIENCE BASED ON CERTAIN CONDITION)
const createSegment = async (data) => {
  const { listId, segment_name, emailList } = req.body;

  const conditions = [];
  emailList.forEach((email) => {
    conditions.push({
      field: 'EMAIL',
      op: 'contains',
      value: email, // email address
    });
  });

  try {
    const response = await mailchimp.lists.createSegment(listId, {
      name: segment_name,
      options: {
        match: 'any',
        conditions: conditions,
      },
    });
    res.send(response.id);
  } catch (err) {
    res.status(400).send(err);
  }
};

// CREATE TEMPLATE
const createTemplate = async (data) => {
  const { templateName } = data;

  const creatingTemplate = async (err, htmlTemplate) => {
    if (err) {
      res.send('An error occured while reading template html file!');
    }
    try {
      const template = await mailchimp.templates.create({
        name: templateName,
        html: htmlTemplate,
      });
      res.send(template.id);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  /* Read the html document as utf8*/
  fs.readFile('./template.html', 'utf8', creatingTemplate);
};

// SEND MARKETING CAMPAIGN
const createCampaign = async (data) => {
  const { ListId, SegmentId, tempalteId, subjectLine, previewText, campaignTitle, fromName, replyTo } = data;
  try {
    const campaign = await mailchimp.campaigns.create({
      type: 'regular',
      recipients: {
        segment_opts: {
          saved_segment_id: SegmentId,
          match: 'any',
        },
        list_id: ListId,
      },
      settings: {
        subject_line: subjectLine,
        preview_text: previewText,
        title: campaignTitle,
        template_id: tempalteId,
        from_name: fromName,
        reply_to: replyTo,
        to_name: '*|FNAME|*',
        auto_footer: true,
        inline_css: true,
      },
    });
    return campaign.id;
  } catch (err) {
    res.status(400).send(err);
  }

  const sendCampaign = async (campaignId) => {
    try {
      await mailchimp.campaigns.send(campaignId);
      return true;
    } catch (e) {
      return e;
    }
  };

  const campaignId = await createCampaign();
  sendCampaign(campaignId);
};

export default {
  createAudiance,
  addListMember,
  addMultipleMembers,
  createSegment,
  createCampaign,
  createTemplate,
};
