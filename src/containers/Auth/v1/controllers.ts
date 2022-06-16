import { Request, Response } from 'express';
import * as UserLoginAndRegisterServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';
import schema from './schema';

export const getGoogleLogin = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.getGoogleLogin());
  },
];

export const getGoogleCallback = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.getGoogleCallback());
  },
];

export const getSession = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.getSession());
  },
];

export const register = [
  Middleware.reqValidate(schema.register),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.register(req.body));
  },
];

export const login = [
  Middleware.reqValidate(schema.login),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.login(req.body));
  },
];

export const getmobileGoogleLogin = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.getmobileGoogleLogin());
  },
];

export const getProfilePicByEmail = [
  Middleware.reqValidate(schema.getProfilePicByEmail),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.getProfilePicByEmail(req.params.email));
  },
];

export const putUpdateUser = [
  Middleware.reqValidate(schema.putUpdateUser),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.putUpdateUser(req.body, req.body.tokenUser));
  },
];

export const getDeleteUser = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.getDeleteUser());
  },
];

export const postDeletingUser = [
  Middleware.reqValidate(schema.postDeletingUser),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.postDeletingUser(req.body));
  },
];

export const getDeletingUserById = [
  Middleware.reqValidate(schema.getDeletingUserById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.getDeletingUserById(+req.params.id));
  },
];

export const getUser = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.getUser(req.body.tokenUser));
  },
];

export const postUserDevice = [
  Middleware.reqValidate(schema.postUserDevice),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.postUserDevice(req.body, req.body.tokenUser));
  },
];

export const postMobileUserDevice = [
  Middleware.reqValidate(schema.postMobileUserDevice),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.postMobileUserDevice(req.body));
  },
];

export const postMobileUserData = [
  Middleware.reqValidate(schema.postMobileUserData),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.postMobileUserData(req.body));
  },
];

export const getTwitterCallback = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.getTwitterCallback());
  },
];

export const getFacebookCallback = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.getFacebookCallback());
  },
];

export const postSetAdmin = [
  Middleware.reqValidate(schema.postSetAdmin),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, UserLoginAndRegisterServices.postSetAdmin(req.body));
  },
];
