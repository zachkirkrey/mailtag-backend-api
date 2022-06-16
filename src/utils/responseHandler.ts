import { Pagination } from '@/types';
import { Response } from 'express';
import CONFIG from '@/config';

type Codes = 400 | 401 | 403 | 404 | 500;

const messages = {
  400: 'Malformed or illegal request.',
  401: 'Your session expired. Login again.',
  403: "You don't have permission for requested resource.",
  404: 'Requested resource not found.',
  500: 'Sorry, something went wrong.',
};

type ErrorProps = {
  code: Codes;
  res: Response;
  message?: string;
  err?: { message: string } | any;
  flag?: string;
};

type SuccessProps = {
  data: {} | any[];
  res: Response;
  pagination?: Pagination;
};

export function sendErrorResponse({ err, code, message, res, flag }: ErrorProps): Response {
  const isProd = CONFIG.ENV === 'prod';

  console.log(err, message, flag);

  return res.status(code || 500).json({
    error: true,
    message: message || err?.message || messages[code],
    originalError: isProd ? undefined : err?.message || err,
    flag,
  });
}

export function sendSuccessResponse({ data, res, pagination }: SuccessProps): Response {
  return res.status(200).json({
    success: true,
    data,
    ...pagination,
  });
}
