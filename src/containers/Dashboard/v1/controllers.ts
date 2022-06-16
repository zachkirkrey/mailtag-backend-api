import { Request, Response } from 'express';
import * as DashboardServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';
import schema from './schema';

// DOCUMENT API
export const getStatsInfo = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getStatsInfo(searchObj));
  },
];

export const getGraphData = [
  Middleware.reqValidate(schema.getGraphData),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = {
      userId: req.body.tokenUser.id,
      ...req.body.searchCriteria,
    };
    await Utils.controller.handler(req, res, DashboardServices.getGraphData(searchObj));
  },
];

export const getRecentUnreadEmailsCount = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getGraphData(searchObj));
  },
];

export const getSignatureClicksCount = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getGraphUnreadEmailsCount(searchObj));
  },
];

export const postSelectPlan = [
  Middleware.reqValidate(schema.postSelectPlan),
  async (req: Request, res: Response): Promise<void | Response> => {
    const selectPlanObj = {
      userId: req.body.tokenUser.id,
      ...req.body.searchCriteria,
      ...req.body.planObj,
    };
    await Utils.controller.handler(req, res, DashboardServices.postSelectPlan(selectPlanObj));
  },
];

export const getGraphUnreadEmailsCount = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getGraphUnreadEmailsCount(searchObj));
  },
];

// SORTED API
export const getEmailSendTodayCount = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getOptimization(searchObj));
  },
];

export const getEmailSendCurrentMonthCount = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getOptimization(searchObj));
  },
];

export const getAverageOpenRatePercentage = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getOptimization(searchObj));
  },
];

export const getAverageLinkClickRate = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getOptimization(searchObj));
  },
];

export const getEmailSentAndOpen = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getOptimization(searchObj));
  },
];

export const getAppConfigKeys = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getOptimization(searchObj));
  },
];

export const getMilestoneEvent = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getOptimization(searchObj));
  },
];

export const getSignatureById = [
  Middleware.reqValidate(schema.getSignatureById),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { id: req.params.id, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getSignatureById(searchObj));
  },
];

export const getOptimization = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getOptimization(searchObj));
  },
];

export const getEmailCount = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { distinct: 'id' };
    await Utils.controller.handler(req, res, DashboardServices.getEmailCount(searchObj));
  },
];

export const getSignature = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getSignature(searchObj));
  },
];

export const getAllSignatures = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getAllSignatures(searchObj));
  },
];

export const getTeamManagement = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getTeamManagement(searchObj));
  },
];

export const getDashboardOld = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getDashboardOld(searchObj));
  },
];

export const getDashboard = [
  async (req: Request, res: Response): Promise<void | Response> => {
    console.log(' --- getDashboard ---');

    console.log('body -> ', req.body);

    console.log('headers -> ', req.headers);

    if (req.body.tokenUser?.id) {
      const searchObj = { userId: req.body.tokenUser.id };
      await Utils.controller.handler(req, res, DashboardServices.getDashboard(searchObj));
    } else {
      await Utils.controller.handler(req, res, DashboardServices.getDashboard({}));
    }
  },
];

export const getShowSpecificSentEmailById = [
  Middleware.reqValidate(schema.getShowSpecificSentEmailById),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id, id: req.params.id };
    await Utils.controller.handler(req, res, DashboardServices.getShowSpecificSentEmailById(searchObj));
  },
];

export const getAccount = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getAccount(searchObj));
  },
];

export const getAllReadEmails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getAllReadEmails(searchObj));
  },
];

export const getAllRecentUnreadEmails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id, isReaded: false };
    await Utils.controller.handler(req, res, DashboardServices.getAllRecentUnreadEmails(searchObj));
  },
];

export const getUnreadEmails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id, isReaded: false };
    await Utils.controller.handler(req, res, DashboardServices.getUnreadEmails(searchObj));
  },
];

export const getAllPreferences = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getAllPreferences(searchObj));
  },
];

export const getUpgrade = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getUpgrade(searchObj));
  },
];

export const getInvoice = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getInvoice(searchObj));
  },
];

export const getAllVideos = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getAllVideos(searchObj));
  },
];

export const getReferAFriend = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getReferAFriend(searchObj));
  },
];

export const getSupport = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getSupport(searchObj));
  },
];

export const getAllPingEmails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, DashboardServices.getAllPingEmails(searchObj));
  },
];

export const getPingSequenceDetailsById = [
  Middleware.reqValidate(schema.getPingSequenceDetailsById),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = {
      userId: req.body.tokenUser.id,
      pingSequenceId: req.params.pingSequenceId,
    };
    await Utils.controller.handler(req, res, DashboardServices.getPingSequenceDetailsById(searchObj));
  },
];

export const getStopPingEmailById = [
  Middleware.reqValidate(schema.getStopPingEmailById),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id, id: req.params.id };
    await Utils.controller.handler(req, res, DashboardServices.getStopPingEmailById(searchObj));
  },
];

export const getShowSpecificSentPingById = [
  Middleware.reqValidate(schema.getShowSpecificSentPingById),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id, id: req.params.id };
    await Utils.controller.handler(req, res, DashboardServices.getShowSpecificSentPingById(searchObj));
  },
];
