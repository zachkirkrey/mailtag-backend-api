import Plan from 'App/Models/Plan'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import Subscription from 'App/Models/Subscription'

export default class CreateSubscriptionIntent {
  constructor(
    private readonly planId: Plan['id'],
    private readonly customerId?: Subscription['stripeCustomerId']
  ) {}

  public async call() {
    const plan = await Plan.query().where({ id: this.planId }).firstOrFail()

    const session = await Stripe.checkout.sessions.create({
      customer: this.customerId,
      line_items: [
        {
          price: plan.stripePlanId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'https://mailtag.io/subscription-checkout?success',
      cancel_url: 'https://mailtag.io/subscription-checkout?failed',
    })

    return session
  }
}
