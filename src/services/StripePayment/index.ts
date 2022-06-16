import Stripe from 'stripe';
import stripe from './root';
import webhook from './webhook';

const ERROR_MESSAGE = 'Sorry, something went wrong on our end, we will get back to you soon.';

const RETRY_MESSAGE = 'Oops, network problem. Please, retry in few minutes.';

const errorHandler = (err: Stripe.StripeError) => {
  console.log(err);
  let errMsg = '';

  switch (err.type) {
    case 'StripeCardError':
      // A declined card error∂
      errMsg = err.message; // => e.g. "Your card's expiration year is invalid."

      break;
    case 'StripeRateLimitError':
      // Too many requests made to the API too quicklyS
      errMsg = ERROR_MESSAGE;

      break;
    case 'StripeInvalidRequestError':
      // Invalid parameters were supplied to Stripe's API
      errMsg = ERROR_MESSAGE;
      break;
    case 'StripeAPIError':
      // An error occurred internally with Stripe's API
      errMsg = ERROR_MESSAGE;
      break;
    case 'StripeConnectionError':
      // Some kind of error occurred during the HTTPS communication
      errMsg = RETRY_MESSAGE;
      break;
    case 'StripeAuthenticationError':
      // You probably used an incorrect API key
      errMsg = ERROR_MESSAGE;
      break;
    default:
      // Handle any other types of unexpected errors

      errMsg = ERROR_MESSAGE;
  }

  throw {
    message: errMsg,
  };
};

const createCustomer = async (data: Stripe.CustomerCreateParams) => {
  try {
    return await stripe.customers.create(data);
  } catch (err) {
    return errorHandler(err);
  }
};

const createSubscription = async (data: Stripe.SubscriptionCreateParams) => {
  try {
    return await stripe.subscriptions.create({
      ...data,
    });
  } catch (err) {
    return errorHandler(err);
  }
};

const cancelSubscription = async (subscriptionId: string) => {
  try {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  } catch (err) {
    return errorHandler(err);
  }
};

const retrieveSubscription = async (subscriptionId: string) => {
  try {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
  } catch (err) {
    return errorHandler(err);
  }
};

const switchSubscription = async (subscriptionId: string) => {
  try {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
  } catch (err) {
    return errorHandler(err);
  }
};

const createCoupon = async (data: Stripe.CouponCreateParams) => {
  try {
    return await stripe.coupons.create(data);
  } catch (err) {
    return errorHandler(err);
  }
};

const createPromotionCodes = async (data: Stripe.PromotionCodeCreateParams) => {
  try {
    return await stripe.promotionCodes.create(data);
  } catch (err) {
    return errorHandler(err);
  }
};

const deleteCoupon = async (couponId) => {
  try {
    return await stripe.coupons.del(couponId);
  } catch (err) {
    return errorHandler(err);
  }
};

export default {
  stripe,
  webhook,
  createCustomer,
  createPromotionCodes,
  createCoupon,
  createSubscription,
  cancelSubscription,
  retrieveSubscription,
  switchSubscription,
  deleteCoupon,
};
