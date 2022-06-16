import { Request, Response } from 'express';
import * as AdminServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';
import schema from './schema';

export const getSignatureById = [
  Middleware.reqValidate(schema.getSignatureById),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, AdminServices.getSignatureById(+req.params.id));
  },
];
