import { Request, Response } from 'express';
import * as PingsServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';
import schema from './schema';

// DOCUMENT APIS
export const getAllPingEmails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.getAllPingEmails());
  },
];

export const putPingSequenceDetails = [
  Middleware.reqValidate(schema.putPingSequenceDetails),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.sequenceObj, userId: req.body.user.id };
    await Utils.controller.handler(req, res, PingsServices.putPingSequenceDetails(data, +req.params.id));
  },
];

export const read = [
  Middleware.reqValidate(schema.read),
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, PingsServices.read(req.params, searchObj));
  },
];

export const create = [
  Middleware.reqValidate(schema.create),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body, userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, PingsServices.create(data));
  },
];

export const putPingSequenceSettings = [
  Middleware.reqValidate(schema.putPingSequenceSettings),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.settingObj, userId: req.body.user.id };
    await Utils.controller.handler(req, res, PingsServices.putPingSequenceSettings(data, +req.params.id));
  },
];

export const postPingSequenceSettings = [
  Middleware.reqValidate(schema.postPingSequenceSettings),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.settingObj, userId: req.body.user.id };
    await Utils.controller.handler(req, res, PingsServices.postPingSequenceSettings(data));
  },
];

export const update = [
  Middleware.reqValidate(schema.update),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.update(+req.params.id, req.body));
  },
];

export const remove = [
  Middleware.reqValidate(schema.remove),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.remove(+req.params.id));
  },
];

export const readById = [
  Middleware.reqValidate(schema.readById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.readById(+req.params.id));
  },
];

export const getPingSequenceDetailsById = [
  Middleware.reqValidate(schema.getPingSequenceDetailsById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.getPingSequenceDetailsById(+req.params.pingSequenceId));
  },
];

export const getPingSequenceById = [
  Middleware.reqValidate(schema.getPingSequenceById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.getPingSequenceById(+req.params.id));
  },
];

export const postPingEmail = [
  Middleware.reqValidate(schema.postPingEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postPingEmail(req.body));
  },
];

export const postPingEmailMg = [
  Middleware.reqValidate(schema.postPingEmailMg),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postPingEmailMg(req.body));
  },
];

export const postStopPingEmail = [
  Middleware.reqValidate(schema.postStopPingEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postStopPingEmail(req.body));
  },
];

export const postStopPingEmailMg = [
  Middleware.reqValidate(schema.postStopPingEmailMg),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postStopPingEmailMg(req.body));
  },
];

export const postTemporaryEmailBouncesWebhook = [
  Middleware.reqValidate(schema.postTemporaryEmailBouncesWebhook),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postTemporaryEmailBouncesWebhook(req.body));
  },
];

export const deletePingEmail = [
  Middleware.reqValidate(schema.deletePingEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.deletePingEmail(req.body));
  },
];

export const postPingSequenceDetails = [
  Middleware.reqValidate(schema.postPingSequenceDetails),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.pingObj, userId: req.body.user.id };
    await Utils.controller.handler(req, res, PingsServices.postPingSequenceDetails(data));
  },
];

export const deletePingSequenceDetails = [
  Middleware.reqValidate(schema.deletePingSequenceDetails),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.deletePingSequenceDetails(+req.params.id));
  },
];

export const getPingSequenceDetails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.user.id };

    await Utils.controller.handler(req, res, PingsServices.getPingSequenceDetails(searchObj));
  },
];

export const getPingSequenceSettings = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.user.id };

    await Utils.controller.handler(req, res, PingsServices.getPingSequenceSettings(searchObj));
  },
];

export const deletePingSequence = [
  Middleware.reqValidate(schema.deletePingSequence),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.deletePingSequence(req.body));
  },
];

export const postSendPingPreviewEmail = [
  Middleware.reqValidate(schema.postSendPingPreviewEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postSendPingPreviewEmail(req.body));
  },
];

export const postPingEmailByDraftId = [
  Middleware.reqValidate(schema.postPingEmailByDraftId),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postPingEmailByDraftId(req.body));
  },
];

export const postPingsDetail = [
  Middleware.reqValidate(schema.postPingsDetail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postPingsDetail(req.body));
  },
];

export const postMobilePingEmails = [
  Middleware.reqValidate(schema.postMobilePingEmails),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postMobilePingEmails(req.body));
  },
];

export const postMobileSearchPingEmailSummary = [
  Middleware.reqValidate(schema.postMobileSearchPingEmailSummary),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postMobileSearchPingEmailSummary(req.body));
  },
];

export const getSearchPingEmailSummary = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.getSearchPingEmailSummary());
  },
];

export const getRestartPingEmail = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.getRestartPingEmail());
  },
];

export const postCustomDomainPings = [
  Middleware.reqValidate(schema.postCustomDomainPings),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.postCustomDomainPings(req.body));
  },
];

export const getCustomDomainPings = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.getCustomDomainPings());
  },
];

export const getPingSequenceListByOffset = [
  Middleware.reqValidate(schema.getPingSequenceListByOffset),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PingsServices.getPingSequenceListByOffset(+req.params.offset));
  },
];
