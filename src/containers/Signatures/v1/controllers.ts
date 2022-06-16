import { Request, Response } from 'express';
import * as SignatureServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';
import schema from './schema';

// DOCUMENT APIS
export const getSignatureCalculator = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, SignatureServices.getSignatureCalculator(searchObj));
  },
];

export const postSignature = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { userId: req.body.tokenUser.id, ...req.body.signatureObj };
    await Utils.controller.handler(req, res, SignatureServices.postSignature(data));
  },
];

export const postScheduleCall = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const callData = {
      userId: req.body.tokenUser.id,
      ...req.body.signatureObj,
    };
    await Utils.controller.handler(req, res, SignatureServices.postScheduleCall(callData));
  },
];

export const create = [
  Middleware.reqValidate(schema.create),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SignatureServices.create(req.body, req.body.user.tokenUser));
  },
];
export const read = [
  Middleware.reqValidate(schema.read),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SignatureServices.read(req.params, req.body.user.tokenUser));
  },
];
export const readById = [
  Middleware.reqValidate(schema.readById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SignatureServices.readById(+req.params.id, req.body.user.tokenUser));
  },
];
export const update = [
  Middleware.reqValidate(schema.update),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(
      req,
      res,
      SignatureServices.update(+req.params.id, req.body, req.body.user.tokenUser)
    );
  },
];
export const remove = [
  Middleware.reqValidate(schema.remove),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SignatureServices.remove(+req.params.id, req.body.user.tokenUser));
  },
];

export const postGettingSignatureData = [
  Middleware.reqValidate(schema.postGettingSignatureData),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(
      req,
      res,
      SignatureServices.postGettingSignatureData(req.body.signatureObject, req.body.user.tokenUser)
    );
  },
];

export const postSignatureCalculator = [
  Middleware.reqValidate(schema.postSignatureCalculator),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SignatureServices.postSignatureCalculator(req.body.signatureCalObject));
  },
];

export const getSetDefaultSignature = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SignatureServices.getSetDefaultSignature());
  },
];

export const putSignatureCalculator = [
  Middleware.reqValidate(schema.putSignatureCalculator),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(
      req,
      res,
      SignatureServices.putSignatureCalculator(+req.params.id, req.body.signatureCalObject)
    );
  },
];

export const deleteSignatureCalculator = [
  Middleware.reqValidate(schema.deleteSignatureCalculator),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SignatureServices.deleteSignatureCalculator(+req.params.id));
  },
];

export const getSignatureEventV2 = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SignatureServices.getSignatureEventV2());
  },
];

export const getSignatureEventById = [
  Middleware.reqValidate(schema.getSignatureEventById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SignatureServices.getSignatureEventById(+req.params.emailId));
  },
];

export const postSendEmailSignature = [
  Middleware.reqValidate(schema.postSendEmailSignature),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SignatureServices.postSendEmailSignature(req.body.emailSigObject));
  },
];
