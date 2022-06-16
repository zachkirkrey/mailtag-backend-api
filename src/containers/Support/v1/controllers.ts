import { Request, Response } from 'express';
import * as SupportServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';
import schema from './schema';

export const getlambdaTest = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getlambdaTest());
  },
];

export const getlambdaTest2 = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getlambdaTest2());
  },
];

export const getDbBackup = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getDbBackup());
  },
];

export const getDemo = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getDemo());
  },
];

export const getTest = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getTest());
  },
];

export const getInstall = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getTest());
  },
];

export const getIndex = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getIndex());
  },
];

export const getGettingStarted = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getGettingStarted());
  },
];

export const getMtSpecialUpgrade = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getMtSpecialUpgrade());
  },
];

export const getMtSpecialUpgradeSuccess = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getMtSpecialUpgradeSuccess());
  },
];

export const getDealFuel = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getDealFuel());
  },
];

export const getDealFuelSuccess = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getDealFuelSuccess());
  },
];

export const getSiteUpgrade = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getSiteUpgrade());
  },
];

export const getSiteUpgradeOnboarding = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getSiteUpgradeOnboarding());
  },
];

export const getSiteUpgradeSuccess = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getSiteUpgradeSuccess());
  },
];

export const getAboutUs = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getAboutUs());
  },
];

export const getThanks = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getThanks());
  },
];

export const getLeaving = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getLeaving());
  },
];

export const getCookiesPolicy = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getCookiesPolicy());
  },
];

export const getDisclosurePolicy = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getDisclosurePolicy());
  },
];

export const getPress = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getPress());
  },
];

export const getPrivacyPolicy = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getPrivacyPolicy());
  },
];

export const getInformationSecurityPolicy = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getInformationSecurityPolicy());
  },
];

export const getIncidentResponsePolicy = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getIncidentResponsePolicy());
  },
];

export const getRiskManagementPolicy = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getRiskManagementPolicy());
  },
];

export const getInstallationComplete = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getInstallationComplete());
  },
];

export const getFinalStep = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getFinalStep());
  },
];

export const getTermsConditions = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getTermsConditions());
  },
];

export const getGdpr = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getGdpr());
  },
];

export const getGift = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getGift());
  },
];

export const getGiftSuccess = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getGiftSuccess());
  },
];

export const getGiveProgram = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getGiveProgram());
  },
];

export const getProCredit = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getProCredit());
  },
];

export const getProCreditCounter = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getProCreditCounter());
  },
];

export const getSignatureCalc = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getSignatureCalc());
  },
];

export const getAttachmentEventById = [
  Middleware.reqValidate(schema.putPreferences),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getAttachmentEventById(+req.params.attachmentId));
  },
];

export const getAttachment = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getAttachment());
  },
];

export const getPreferences = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getPreferences());
  },
];

export const putPreferences = [
  Middleware.reqValidate(schema.putPreferences),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.putPreferences(req.body));
  },
];

export const putMobileNotificationPreferences = [
  Middleware.reqValidate(schema.putMobileNotificationPreferences),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.putPreferences(req.body));
  },
];

export const postSupport = [
  Middleware.reqValidate(schema.postSupport),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.postSupport(req.body));
  },
];

export const getEnablePush = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getEnablePush());
  },
];

export const getTrackingPixels = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getTrackingPixels());
  },
];

export const postHomePageClickCall = [
  Middleware.reqValidate(schema.postHomePageClickCall),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.postHomePageClickCall(req.body));
  },
];

export const getRedir = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getRedir());
  },
];

export const getGoogleContactList = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getGoogleContactList());
  },
];

export const getRetrieveCardDetails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getRetrieveCardDetails());
  },
];

export const putUpdateCardDetails = [
  Middleware.reqValidate(schema.putUpdateCardDetails),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.putUpdateCardDetails(req.body));
  },
];

export const getDomainDetails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getDomainDetails());
  },
];

export const postAddFeedback = [
  Middleware.reqValidate(schema.postAddFeedback),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.postAddFeedback(req.body));
  },
];

export const postRaiseTicket = [
  Middleware.reqValidate(schema.postRaiseTicket),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.postRaiseTicket(req.body));
  },
];

export const postchromeStoreLinkClicked = [
  Middleware.reqValidate(schema.postchromeStoreLinkClicked),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.postchromeStoreLinkClicked(req.body));
  },
];

export const getLinkEventV2 = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getLinkEventV2());
  },
];

export const getSubprocessors = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getSubprocessors());
  },
];

export const getEu = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getEu());
  },
];

export const postSegmentAnalytics = [
  Middleware.reqValidate(schema.postSegmentAnalytics),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.postSegmentAnalytics(req.body));
  },
];

export const postAddFreeTrial10thFeedback = [
  Middleware.reqValidate(schema.postAddFreeTrial10thFeedback),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.postAddFreeTrial10thFeedback(req.body));
  },
];

export const getIpToCountry = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.getIpToCountry());
  },
];

export const postMobilePushNotification = [
  Middleware.reqValidate(schema.postMobilePushNotification),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.postMobilePushNotification(req.body));
  },
];

export const postBlog = [
  Middleware.reqValidate(schema.postBlog),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.postBlog(req.body));
  },
];

export const postSetDefaultSignature = [
  Middleware.reqValidate(schema.postSetDefaultSignature),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SupportServices.postSetDefaultSignature(req.body));
  },
];
