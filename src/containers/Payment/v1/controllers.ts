import { Request, Response } from 'express';
import * as PaymentServices from './services';
import * as Utils from '@/utils';
import Middleware from '@/middleware';
import schema from './schema';

export const getPurchase = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getPurchase());
  },
];

export const getPurchaseSuccess = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getPurchaseSuccess());
  },
];

export const getInvoice = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getInvoice());
  },
];

export const getInvoiceToPdf = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getInvoiceToPdf());
  },
];

export const getSiteUpgradeCoupon = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getSiteUpgradeCoupon());
  },
];

export const getSiteUpgradeCouponSuccess = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getSiteUpgradeCouponSuccess());
  },
];

export const getCoupon = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getCoupon());
  },
];

export const getCreateCoupon = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getCreateCoupon());
  },
];

export const postCreatingCoupon = [
  Middleware.reqValidate(schema.postCreatingCoupon),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postCreatingCoupon(req.body));
  },
];

export const getCouponCreate = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getCouponCreate());
  },
];

export const postCoupon = [
  Middleware.reqValidate(schema.postCoupon),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postCoupon(req.body));
  },
];

export const postPlanSwitch = [
  Middleware.reqValidate(schema.postPlanSwitch),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postPlanSwitch(req.body));
  },
];

export const postSubscribeTeam = [
  Middleware.reqValidate(schema.postSubscribeTeam),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postSubscribeTeam(req.body));
  },
];

export const postSubscribeTeamPaypal = [
  Middleware.reqValidate(schema.postSubscribeTeamPaypal),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postSubscribeTeamPaypal(req.body));
  },
];

export const postSubscriptionPaypal = [
  Middleware.reqValidate(schema.postSubscriptionPaypal),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postSubscriptionPaypal(req.body));
  },
];

export const postSubscription = [
  Middleware.reqValidate(schema.postSubscription),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postSubscription(req.body));
  },
];

export const postSubscriptionWebhook = [
  Middleware.reqValidate(schema.postSubscriptionWebhook),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postSubscriptionWebhook(req.body));
  },
];

export const postCheckSubscription = [
  Middleware.reqValidate(schema.postCheckSubscription),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postCheckSubscription(req.body));
  },
];

export const postCancelSubscription = [
  Middleware.reqValidate(schema.postCancelSubscription),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postCancelSubscription(req.body));
  },
];

export const postSwitchSubscription = [
  Middleware.reqValidate(schema.postSwitchSubscription),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postSwitchSubscription(req.body));
  },
];

export const deleteSubscription = [
  Middleware.reqValidate(schema.deleteSubscription),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.deleteSubscription(+req.params.id));
  },
];

export const getSubscription = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getSubscription());
  },
];

export const getAccountSubscription = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getAccountSubscription());
  },
];

export const getSwitchSubscription = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getSwitchSubscription());
  },
];

export const getPricing = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getPricing());
  },
];

export const getPricingOnboarding = [
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.getPricingOnboarding());
  },
];

export const postPaypalWebhookPaymentCaptureCompleted = [
  Middleware.reqValidate(schema.postPaypalWebhookPaymentCaptureCompleted),
  async (req: Request, res: Response): Promise<void | Response> => {
    await Utils.controller.handler(req, res, PaymentServices.postPaypalWebhookPaymentCaptureCompleted(req.body));
  },
];
