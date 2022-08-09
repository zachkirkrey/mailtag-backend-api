import Stripe from '@ioc:Adonis/Addons/Stripe'
import Subscription from 'App/Models/Subscription'

export default class ChangePaymentMethodIntent {
  constructor(
    private readonly customerId: Subscription['stripeCustomerId'],
    private readonly subscriptionId: Subscription['stripeCustomerId']
  ) {}

  public async call() {
    const session = await Stripe.checkout.sessions.create({
      customer: this.customerId,
      payment_method_types: ['card'],
      mode: 'setup',
      setup_intent_data: {
        metadata: {
          customer_id: this.customerId,
          subscription_id: this.subscriptionId,
        },
      },
      success_url: 'https://mailtag.io/subscription-checkout?success',
      cancel_url: 'https://mailtag.io/subscription-checkout?failed',
    })

    return session
  }
}
