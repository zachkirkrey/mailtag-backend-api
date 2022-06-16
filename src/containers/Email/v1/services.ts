import Models from '@/models';
import IP from '@/services/IP';
import Email from '@/services/Email';

// EMAILS
export const pixelTracking = async (data: object): Promise<unknown> => {
  const ipDetails = await IP(data.ip);
  const pixelId = data.pixelId;
  const email = await Models.Emails.findOne({
    where: {
      pixelId,
    },
  });

  // await Models.PixelTracking.create({
  //   pixelId,
  //   ipDetails,
  //   email: email.id,
  // });
};

// EMAILS
export const createEmail = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readEmails = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readEmailById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Emails.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateEmail = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const removeEmail = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Emails.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postEmailMg = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getEmailSummaryOld = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      // Here set the criteria
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getEmailSummary = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      // Here set the criteria
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getSentEmailByDate = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postMobileSearchReadEmailSummary = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...data,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getSearchUnreadEmailSummary = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getReadEmailSummary = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postmobileSearchUnreadEmailSummary = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getUnreadEmailSummary = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

interface EmailObj {
  company: string;
  address: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  language: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  tag: [];
  segmentName: string;
  emailList: [];
  templateName: string;
  subjectLine: string;
  previewText: string;
  campaignTitle: string;
  replyTo: string;
}

export const postSendInvitationEmailGmailContacts = async (data: EmailObj): Promise<unknown> => {
  try {
    // Send Email Invitation
    const {
      company,
      address1,
      address,
      city,
      state,
      zip,
      country,
      fromName,
      fromEmail,
      subject,
      language,
      userName,
      firstName,
      lastName,
      email,
      tag,
      segmentName,
      emailList,
      templateName,
      subjectLine,
      previewText,
      campaignTitle,
      replyTo,
    } = data;
    const footerContactInfo = {
      company,
      address1,
      address,
      city,
      state,
      zip,
      country,
    };
    const campaignDefaults = { fromName, fromEmail, subject, language };

    const audienceId = Email.createAudiance({
      userName,
      footerContactInfo,
      campaignDefaults,
    });
    const listId = Email.addListMember({
      listId: audienceId,
      firstName,
      lastName,
      email,
      tag,
    });

    const res = await Models.Emails.findAll({
      attributes: ['to'],
    });

    const SegmentId = Email.createSegment({
      listId: audienceId,
      segmentName,
      emailList: res,
    });

    const tempalteId = Email.createTemplate({ templateName });

    Email.createCampaign({
      listId,
      SegmentId,
      tempalteId,
      subjectLine,
      previewText,
      campaignTitle,
      fromName,
      replyTo,
    });

    return true;
  } catch (ex) {
    return ex;
  }
};

export const getReadEmailByDate = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getOptimisedEmailSummaryV2 = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Emails.findAll({
      where: {
        ...searchObj,
        // set criteria here
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postCreateMailchimpUser = async (data: object): Promise<unknown> => {
  try {
    // Write Code here
    // const res = await Models.LinkEvent.create({
    //   ...data,
    //   userId: tokenUser.id,
    // });
    // return res;
  } catch (ex) {
    return ex;
  }
};

export const getGmailDisclaimer = async (searchObj: object): Promise<unknown> => {
  try {
    // set criteria here
    const res = await Models.Emails.findAll({
      where: {
        // set criteria here
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postRefreshGmail = async (data: object): Promise<unknown> => {
  try {
    // Write Code here
    // const res = await Models.LinkEvent.create({
    //   ...data,
    //   userId: tokenUser.id,
    // });
    // return res;
  } catch (ex) {
    return ex;
  }
};

// EMAIL EVENTS
export const createEmailEvent = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.EmailEvents.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readEmailEvents = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.EmailEvents.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readEmailEventById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.EmailEvents.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateEmailEvent = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.EmailEvents.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const removeEmailEvent = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.EmailEvents.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getDemoEmailEventByEmailId = async (emailId: string): Promise<unknown> => {
  try {
    const res = await Models.EmailEvents.findAll({
      where: {
        emailId: emailId,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getEmailEventByEmailId = async (emailId: string): Promise<unknown> => {
  try {
    const res = await Models.EmailEvents.findAll({
      where: {
        emailId: emailId,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postExtensionLinkSendEmail = async (data: Object): Promise<unknown> => {
  try {
    // Apply criteria here
    // const res = await Models.Emails.findAll({
    //   where: {
    //     isReaded: true,
    //     createdAt: date,
    //     userId: tokenUser.id,
    //   },
    // });
    // return res;
  } catch (ex) {
    return ex;
  }
};

// PING EMAILS
export const createPingEmail = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readPingEmails = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readPingEmailById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updatePingEmail = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const removePingEmail = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const postPermanentEmailBouncesWebhook = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const putEmailByDraftById = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.PingEmails.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

// LINKS
export const createLink = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.Links.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readLinks = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Links.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readLinkById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Links.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateLink = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.Links.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const removeLink = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.Links.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getOptimisedLinkSummaryByEmailId = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.Links.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const getCustomDomain = async (searchObj: object): Promise<unknown> => {
  try {
    // set criteria here
    const res = await Models.Links.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

// LINK EVENTS
export const createLinkEvent = async (data: object): Promise<unknown> => {
  try {
    const res = await Models.LinkEvent.create({
      ...data,
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readLinkEvents = async (searchObj: object): Promise<unknown> => {
  try {
    const res = await Models.LinkEvent.findAll({
      where: {
        ...searchObj,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const readLinkEventById = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.LinkEvent.findByPk(id);
    return res;
  } catch (ex) {
    return ex;
  }
};

export const updateLinkEvent = async (id: number, data: object): Promise<unknown> => {
  try {
    const res = await Models.LinkEvent.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};

export const removeLinkEvent = async (id: number): Promise<unknown> => {
  try {
    const res = await Models.LinkEvent.destroy({
      where: {
        id: id,
      },
    });
    return res;
  } catch (ex) {
    return ex;
  }
};
