import Models from '@/models';
import StripePayment from '@/services/StripePayment';

export const createSubscription = async (data, tokenUser): Promise<unknown> => {
  const user = await Models.Users.findByPk(tokenUser.id);
  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const res = await StripePayment.createCustomer({
      email: user.email,
    });
    customerId = res.id;
    await Models.Users.update(
      {
        stripeCustomerId: res.id,
      },
      { id: tokenUser.id }
    );
  }
  await StripePayment.createSubscription({
    ...data,
    customer: customerId,
  });

  return {};
};

export const getPurchase = async (): Promise<unknown> => {
  return {};
};

export const getPurchaseSuccess = async (): Promise<unknown> => {
  return {};
};

export const getInvoice = async (): Promise<unknown> => {
  return {};
};

export const getInvoiceToPdf = async (): Promise<unknown> => {
  return {};
};

export const getSiteUpgradeCoupon = async (): Promise<unknown> => {
  return {};
};

export const getSiteUpgradeCouponSuccess = async (): Promise<unknown> => {
  return {};
};

export const getCoupon = async (): Promise<unknown> => {
  return {};
};

export const getCreateCoupon = async (): Promise<unknown> => {
  return {};
};

export const postCreatingCoupon = async (couponObj: object): Promise<unknown> => {
  return {};
};

export const getCouponCreate = async (): Promise<unknown> => {
  return {};
};

export const postCoupon = async (couponObj: object): Promise<unknown> => {
  return {};
};

export const postPlanSwitch = async (planObj: object): Promise<unknown> => {
  return {};
};

export const postSubscribeTeam = async (subscriptionObj: object): Promise<unknown> => {
  return {};
};

export const postSubscribeTeamPaypal = async (subscriptionObj: object): Promise<unknown> => {
  return {};
};

export const postSubscriptionPaypal = async (subscriptionObj: object): Promise<unknown> => {
  return {};
};

export const postSubscription = async (subscriptionObj: object): Promise<unknown> => {
  return {};
};

export const postSubscriptionWebhook = async (subscriptionObj: object): Promise<unknown> => {
  return {};
};

export const postCheckSubscription = async (subscriptionObj: object): Promise<unknown> => {
  return {};
};

export const postCancelSubscription = async (subscriptionObj: object): Promise<unknown> => {
  return {};
};

export const postSwitchSubscription = async (subscriptionObj: object): Promise<unknown> => {
  return {};
};

export const deleteSubscription = async (id: number): Promise<unknown> => {
  return {};
};

export const getSubscription = async (): Promise<unknown> => {
  return {};
};

export const getAccountSubscription = async (): Promise<unknown> => {
  return {};
};

export const getSwitchSubscription = async (): Promise<unknown> => {
  return {};
};

export const getPricing = async (): Promise<unknown> => {
  return {};
};

export const getPricingOnboarding = async (): Promise<unknown> => {
  return {};
};

export const postPaypalWebhookPaymentCaptureCompleted = async (paymentObj: object): Promise<unknown> => {
  return {};
};
