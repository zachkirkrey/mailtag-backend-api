import { Application } from 'express';
import * as Controller from './controllers';

export default (app: Application): void => {
  //Views

  app.get('/switch-subscription', Controller.getSwitchSubscription);
  app.get('/pricing', Controller.getPricing);
  app.get('/pricing-onboarding', Controller.getPricingOnboarding);
  app.get('/purchase', Controller.getPurchase);
  app.get('/purchase-success', Controller.getPurchaseSuccess);
  app.get('/site-upgrade-coupon-success', Controller.getSiteUpgradeCouponSuccess);
  app.get('/site-upgrade-coupon-success', Controller.getSiteUpgradeCouponSuccess);
  app.get('/create-coupon', Controller.getCreateCoupon);
  //APIs

  app.get('/api/v1/invoice', Controller.getInvoice);
  app.get('/api/v1/invoice-to-pdf', Controller.getInvoiceToPdf);
  app.get('/api/v1/site-upgrade-coupon', Controller.getSiteUpgradeCoupon);
  app.get('/api/v1/coupon', Controller.getCoupon);
  app.post('/api/v1/creating-coupon', Controller.postCreatingCoupon);
  app.get('/api/v1/coupon-create', Controller.getCouponCreate);
  app.post('/api/v1/coupon', Controller.postCoupon);
  app.post('/api/v1/plan-switch', Controller.postPlanSwitch);
  app.post('/api/v1/subscribe-team', Controller.postSubscribeTeam);
  app.post('/api/v1/subscribe-team-paypal', Controller.postSubscribeTeamPaypal);
  app.post('/api/v1/subscription-paypal', Controller.postSubscriptionPaypal);
  app.post('/api/v1/subscription', Controller.postSubscription);
  app.post('/api/v1/subscription-webhook', Controller.postSubscriptionWebhook);
  app.post('/api/v1/check-subscription', Controller.postCheckSubscription);
  app.post('/api/v1/cancel-subscription', Controller.postCancelSubscription);
  app.post('/api/v1/switch-subscription', Controller.postSwitchSubscription);
  app.delete('/api/v1/subscription/:id', Controller.deleteSubscription);
  app.get('/api/v1/subscription', Controller.getSubscription);
  app.get('/api/v1/account-subscription', Controller.getAccountSubscription);

  app.post('/api/v1/paypal-webhook/payment-capture-completed', Controller.postPaypalWebhookPaymentCaptureCompleted);
};
