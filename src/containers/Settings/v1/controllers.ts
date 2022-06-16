import { Request, Response } from 'express';
import * as SettingsServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';
import schema from './schema';

// CONFIG KEYS
export const createConfigKeys = [
  Middleware.reqValidate(schema.createConfigKeys),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.configObj, userId: req.body.user.id };
    await Utils.controller.handler(req, res, SettingsServices.createConfigKeys(data));
  },
];

export const readConfigKeys = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const configObj = {
      ...req.body.configObj,
      userId: req.body.user.id,
      isAppConfig: false,
    };
    await Utils.controller.handler(req, res, SettingsServices.readConfigKeys(configObj));
  },
];

export const readConfigKeysById = [
  Middleware.reqValidate(schema.readConfigKeysById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SettingsServices.readConfigKeysById(+req.params.id));
  },
];

export const updateConfigKeys = [
  Middleware.reqValidate(schema.updateConfigKeys),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SettingsServices.updateConfigKeys(+req.params.id, req.body));
  },
];
export const removeConfigKeys = [
  Middleware.reqValidate(schema.removeConfigKeys),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SettingsServices.removeConfigKeys(+req.params.id));
  },
];

// APP CONFIG KEYS
export const createAppConfigKeys = [
  Middleware.reqValidate(schema.createAppConfigKeys),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.configObj, userId: req.body.user.id };
    await Utils.controller.handler(req, res, SettingsServices.createAppConfigKeys(data));
  },
];

export const readAppConfigKeys = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const configObj = { userId: req.body.user.id, isAppConfig: true };
    await Utils.controller.handler(req, res, SettingsServices.readAppConfigKeys(configObj));
  },
];

export const readAppConfigKeysById = [
  Middleware.reqValidate(schema.readAppConfigKeysById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SettingsServices.readAppConfigKeysById(+req.params.id));
  },
];

export const updateAppConfigKeys = [
  Middleware.reqValidate(schema.updateAppConfigKeys),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SettingsServices.updateAppConfigKeys(+req.params.id, req.body));
  },
];
export const removeAppConfigKeys = [
  Middleware.reqValidate(schema.removeAppConfigKeys),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SettingsServices.removeAppConfigKeys(+req.params.id));
  },
];

// ERRORS
export const createError = [
  Middleware.reqValidate(schema.createError),
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { ...req.body.errorObj, userId: req.body.user.id };
    await Utils.controller.handler(req, res, SettingsServices.createError(data));
  },
];

export const readErrors = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const data = { userId: req.body.user.id };
    await Utils.controller.handler(req, res, SettingsServices.readErrors(data));
  },
];

export const readErrorById = [
  Middleware.reqValidate(schema.readErrorById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SettingsServices.readErrorById(+req.params.id));
  },
];

export const updateError = [
  Middleware.reqValidate(schema.updateError),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SettingsServices.updateError(+req.params.id, req.body));
  },
];
export const removeError = [
  Middleware.reqValidate(schema.removeError),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, SettingsServices.removeError(+req.params.id));
  },
];
