import { Request, Response } from 'express';
import * as EmailServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';
import schema from './schema';

// EMAILS
export const createEmail = [
  Middleware.reqValidate(schema.createEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.emailObj, userId: req.body.tokenUser.id };

    await Utils.controller.handler(req, res, EmailServices.createEmail(data));
  },
];

export const readEmails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.readEmails(searchObj));
  },
];

export const readEmailById = [
  Middleware.reqValidate(schema.readEmailById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.readEmailById(+req.params.id));
  },
];

export const updateEmail = [
  Middleware.reqValidate(schema.updateEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.updateEmail(+req.params.id, req.body));
  },
];

export const removeEmail = [
  Middleware.reqValidate(schema.removeEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.removeEmail(+req.params.id));
  },
];

export const postEmailMg = [
  Middleware.reqValidate(schema.postEmailMg),

  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.emailObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.postEmailMg(data));
  },
];

export const getEmailSummaryOld = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.getEmailSummaryOld(searchObj));
  },
];

export const getEmailSummary = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.getEmailSummary(searchObj));
  },
];

export const getSentEmailByDate = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { ...req.body.emailObj.email };
    await Utils.controller.handler(req, res, EmailServices.getSentEmailByDate(searchObj));
  },
];

export const postMobileSearchReadEmailSummary = [
  Middleware.reqValidate(schema.postMobileSearchReadEmailSummary),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { isReaded: true, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.postMobileSearchReadEmailSummary(data));
  },
];

export const getSearchUnreadEmailSummary = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id, isReaded: false };
    await Utils.controller.handler(req, res, EmailServices.getSearchUnreadEmailSummary(searchObj));
  },
];

export const getReadEmailSummary = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.getReadEmailSummary(searchObj));
  },
];

export const postmobileSearchUnreadEmailSummary = [
  Middleware.reqValidate(schema.postmobileSearchUnreadEmailSummary),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { isReaded: false, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.getReadEmailSummary(searchObj));
  },
];

export const getUnreadEmailSummary = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { isReaded: false, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.getReadEmailSummary(searchObj));
  },
];

export const postSendInvitationEmailGmailContacts = [
  Middleware.reqValidate(schema.postSendInvitationEmailGmailContacts),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.emailObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.postSendInvitationEmailGmailContacts(data));
  },
];

export const getReadEmailByDate = [
  Middleware.reqValidate(schema.getReadEmailByDate),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = {
      isReaded: true,
      createdAt: req.body.date,
      userId: req.body.tokenUser.id,
    };
    await Utils.controller.handler(req, res, EmailServices.getReadEmailByDate(searchObj));
  },
];

export const postExtensionLinkSendEmail = [
  Middleware.reqValidate(schema.postExtensionLinkSendEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.emailObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.postExtensionLinkSendEmail(data));
  },
];

export const getOptimisedEmailSummaryV2 = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.getOptimisedEmailSummaryV2(searchObj));
  },
];

export const postCreateMailchimpUser = [
  Middleware.reqValidate(schema.postCreateMailchimpUser),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.emailChipObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.postCreateMailchimpUser(data));
  },
];

export const getGmailDisclaimer = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.getGmailDisclaimer(searchObj));
  },
];

export const postRefreshGmail = [
  Middleware.reqValidate(schema.postRefreshGmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.gmailObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.postRefreshGmail(data));
  },
];

// EMAIL EVENTS
export const createEmailEvent = [
  Middleware.reqValidate(schema.createEmailEvent),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.emailObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.createEmailEvent(data));
  },
];

export const readEmailEvents = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.readEmailEvents(searchObj));
  },
];

export const readEmailEventById = [
  Middleware.reqValidate(schema.readEmailEventById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.readEmailEventById(+req.params.id));
  },
];

export const updateEmailEvent = [
  Middleware.reqValidate(schema.updateEmailEvent),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.updateEmailEvent(+req.params.id, req.body));
  },
];

export const removeEmailEvent = [
  Middleware.reqValidate(schema.removeEmailEvent),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.removeEmailEvent(+req.params.id));
  },
];

export const getDemoEmailEventByEmailId = [
  Middleware.reqValidate(schema.getDemoEmailEventByEmailId),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.getDemoEmailEventByEmailId(req.params.emailId));
  },
];

export const getEmailEventByEmailId = [
  Middleware.reqValidate(schema.getEmailEventByEmailId),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.getEmailEventByEmailId(req.params.emailId));
  },
];

// PING EMAILS
export const createPingEmail = [
  Middleware.reqValidate(schema.createPingEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.emailObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.createPingEmail(data));
  },
];

export const readPingEmails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.readPingEmails(searchObj));
  },
];

export const readPingEmailById = [
  Middleware.reqValidate(schema.readPingEmailById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.readPingEmailById(+req.params.id));
  },
];

export const updatePingEmail = [
  Middleware.reqValidate(schema.updatePingEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.updatePingEmail(+req.params.id, req.body));
  },
];

export const removePingEmail = [
  Middleware.reqValidate(schema.removePingEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.removePingEmail(+req.params.id));
  },
];

export const postPermanentEmailBouncesWebhook = [
  Middleware.reqValidate(schema.postPermanentEmailBouncesWebhook),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.emailObj, userId: req.body.user.id };
    await Utils.controller.handler(req, res, EmailServices.postPermanentEmailBouncesWebhook(data));
  },
];

export const putEmailByDraftById = [
  Middleware.reqValidate(schema.putEmailByDraftById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.putEmailByDraftById(+req.params.id, req.body));
  },
];

// LINKS
export const createLink = [
  Middleware.reqValidate(schema.createLink),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.linkObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.createLink(data));
  },
];

export const readLinks = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.readLinks(searchObj));
  },
];

export const readLinkById = [
  Middleware.reqValidate(schema.readLinkById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.readLinkById(+req.params.id));
  },
];

export const updateLink = [
  Middleware.reqValidate(schema.updateLink),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.updateLink(+req.params.id, req.body));
  },
];

export const removeLink = [
  Middleware.reqValidate(schema.removeEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.removeEmail(+req.params.id));
  },
];

export const getOptimisedLinkSummaryByEmailId = [
  Middleware.reqValidate(schema.getOptimisedLinkSummaryByEmailId),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = {
      emailId: req.body.emailObj.emailId,
      userId: req.body.tokenUser.id,
    };
    await Utils.controller.handler(req, res, EmailServices.getOptimisedLinkSummaryByEmailId(searchObj));
  },
];

export const getCustomDomain = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.getCustomDomain(searchObj));
  },
];

// LINK EVENTS
export const createLinkEvent = [
  Middleware.reqValidate(schema.createLinkEvent),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.linkObj, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.createLinkEvent(data));
  },
];

export const readLinkEvents = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, EmailServices.readLinkEvents(searchObj));
  },
];

export const readLinkEventById = [
  Middleware.reqValidate(schema.readLinkEventById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.readLinkEventById(+req.params.id));
  },
];

export const updateLinkEvent = [
  Middleware.reqValidate(schema.updateLinkEvent),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.updateLinkEvent(+req.params.id, req.body));
  },
];

export const removeLinkEvent = [
  Middleware.reqValidate(schema.removeLinkEvent),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, EmailServices.removeLinkEvent(+req.params.id));
  },
];
