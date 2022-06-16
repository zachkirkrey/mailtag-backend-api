import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_OBJECT } from '@/types';
import { sendErrorResponse } from '@/utils/responseHandler';
import config from '@/config';

export default (req: Request, res: Response, next: NextFunction): void | Response => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const tokenUser = <JWT_OBJECT>jwt.verify(token, config.JWT_SECRET);
      if (tokenUser?.id) {
        console.log('token id', tokenUser);
        req.tokenUser = tokenUser;
      }
    }
  } catch (err) {
    console.log(err);
  }
  next();
};
