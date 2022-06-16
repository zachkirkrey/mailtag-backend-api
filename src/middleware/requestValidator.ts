import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '@/utils/responseHandler';
import * as joi from '@hapi/joi';

export default (schema: joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction): Response | void => {
  const testObj = {};
  if (Object.keys(req.body).length) {
    testObj['body'] = req.body;
  }
  if (Object.keys(req.params).length) {
    testObj['params'] = req.params;
  }
  if (Object.keys(req.query).length) {
    testObj['query'] = req.query;
  }
  const { error } = schema.validate(testObj);
  if (error) {
    return sendErrorResponse({
      code: 400,
      res,
      err: error,
    });
  }
  next();
};
