import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import User from 'App/Models/User'
import UpdateSubscriptionValidator from 'App/Validators/Subscription/UpdateSubscriptionValidator'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import CreatePaymentValidator from 'App/Validators/Subscription/CreatePaymentValidator'
import CreateSubscriptionIntent from 'App/Services/Subscription/CreateSubscriptionIntent'
import Plan from 'App/Models/Plan'
import PaymentException from 'App/Exceptions/PaymentException'

export default class SubscriptionController {
  public async show({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const subscription = await Subscription.query().where({ userId: user.id }).firstOrFail()

    return {
      data: {
        subscription: subscription.serializedSubscriptionInfo,
      },
    }
  }

  public async update({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const subscription = await Subscription.query().where({ userId: user.id }).firstOrFail()
    const { isCanceled, planId } = await request.validate(UpdateSubscriptionValidator)
    const plan = await Plan.query().where({ id: planId }).firstOrFail()
    const stripeSubscription = await Stripe.subscriptions.retrieve(
      subscription.stripeSubscriptionId
    )

    if (subscription.planId === planId) {
      throw new PaymentException('Selected plan id is already the active subscription plan')
    }

    const updatedStripeSubscription = await Stripe.subscriptions.update(stripeSubscription.id, {
      items: [
        {
          id: stripeSubscription.items.data[0].id,
          price: plan.stripePlanId,
        },
      ],
    })

    const updateAttrs = { stripeSubscriptionId: updatedStripeSubscription.id, isCanceled, planId }
    const updateSubscription = await subscription.merge(updateAttrs).save()

    return {
      data: {
        message: 'Subscription updated successfully',
        subscription: updateSubscription.serializedSubscriptionInfo,
      },
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const subscription = await Subscription.query().where({ userId: user.id }).firstOrFail()

    await Stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    })
    await subscription.merge({ isCanceled: true }).save()

    return {
      data: {
        message: 'Subscription deleted successfully',
      },
    }
  }

  public async createSubscriptionIntent({ auth, request }: HttpContextContract) {
    const user = auth.use('api').user!
    const { planId } = await request.validate(CreatePaymentValidator)
    await user.load('subscription')

    const service = new CreateSubscriptionIntent(planId, user.subscription?.stripeCustomerId)
    const paymentRequest = await service.call()

    return {
      data: {
        id: paymentRequest.id,
        url: paymentRequest.url,
      },
    }
  }
}
