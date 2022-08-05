import Plan from 'App/Models/Plan'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import User from 'App/Models/User'

export default class Payment {
  constructor(private readonly planId: Plan['id']) {}

  public async createPaymentRequest(user: User) {
    const plan = await Plan.query().where({ id: this.planId }).firstOrFail()
    const customerId = user.$hasRelated('subscription')
      ? user.subscription.stripeCustomerId
      : (await Stripe.customers.create({ email: user.email })).id

    const session = await Stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: plan.stripePlanId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'https://mailtag.io/success',
      cancel_url: 'https://mailtag.io/cancel',
    })

    return session
  }

  public async getPaymentRequest(paymentRequestId: string) {
    const session = await Stripe.checkout.sessions.retrieve(paymentRequestId)

    return session
  }
}
