import Plan from 'App/Models/Plan'
import Stripe from '@ioc:Adonis/Addons/Stripe'

export default class Payment {
  constructor(private readonly planId: Plan['id']) {}

  public async createPaymentRequest() {
    const plan = await Plan.query().where({ id: this.planId }).firstOrFail()
    const session = await Stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
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
