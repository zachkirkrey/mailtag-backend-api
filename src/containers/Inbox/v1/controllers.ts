import { Request, Response } from 'express';
import * as InboxServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';

// DOCUMENT APIS
export const getReadedEmails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id, isReaded: true };
    await Utils.controller.handler(req, res, InboxServices.getReadedEmails(searchObj));
  },
];

export const getUnreadedEmails = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id, isReaded: false };
    await Utils.controller.handler(req, res, InboxServices.getUnreadedEmails(searchObj));
  },
];

export const getNewSession = [
  async (req: Request, res: Response): Promise<void | Response> => {
    const searchObj = { userId: req.body.tokenUser.id };
    await Utils.controller.handler(req, res, InboxServices.getNewSession(searchObj));
  },
];
