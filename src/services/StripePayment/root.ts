import Stripe from 'stripe';
import Config from '@/config';

export default new Stripe(Config.STRIPE_KEY, {
  apiVersion: '2020-08-27',
});
