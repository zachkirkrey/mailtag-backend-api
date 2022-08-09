import Plan from 'App/Models/Plan'
import User from 'App/Models/User'
import Stripe from 'stripe'
import Subscription from 'App/Models/Subscription'

export default class CreateSubsciption {
  constructor(private readonly invoice: Stripe.Invoice) {}

  public async call() {
    const {
      status,
      billing_reason: billingReason,
      customer,
      customer_email: customerEmail,
      lines,
      subscription: stripeSubscriptionId,
    } = this.invoice
    const stripePlanId = lines.data[0].price?.id

    if (status !== 'paid' || billingReason !== 'subscription_create') {
      // TODO: log this
      return
    }

    const [user, plan] = await Promise.all([
      User.query().where({ email: customerEmail }).firstOrFail(),
      Plan.query().where({ stripePlanId: stripePlanId }).firstOrFail(),
    ])

    const subscription = await Subscription.firstOrCreate(
      { userId: user.id },
      {
        userId: user.id,
        planId: plan.id,
        paymentStatus: 'paid',
        stripeSubscriptionId: stripeSubscriptionId as string,
        stripeCustomerId: customer as string,
        billing: plan.billing,
      }
    )

    return {
      data: {
        message: 'Subscription created successfully',
        subscription: subscription.serializedSubscriptionInfo,
      },
    }
  }
}
