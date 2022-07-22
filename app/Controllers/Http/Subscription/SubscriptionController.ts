import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import User from 'App/Models/User'
import CreateSubscriptionValidator from 'App/Validators/Subscription/CreateSubscriptionValidator'
import UpdateSubscriptionValidator from 'App/Validators/Subscription/UpdateSubscriptionValidator'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import Plan from 'App/Models/Plan'

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

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { planId, paymentStatus } = await request.validate(CreateSubscriptionValidator)
    const plan = await Plan.query().where({ id: planId }).firstOrFail()

    const customer = await Stripe.customers.create({
      email: user.email,
    })

    const session = await Stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
            },
            unit_amount: plan.price, //FIXME maybe need to be string or vice versa on decimal
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://mailtag.io/success',
      cancel_url: 'https://mailtag.io/cancel',
    })

    // FIXME add payment logic then create may be add a service async
    const subscription = await Subscription.create({ userId: user.id, planId, paymentStatus })

    return {
      data: {
        payment: { id: session.id, url: session.url },
        customer: { id: customer.id, email: customer.email },
        message: 'Subscription created successfully',
        subscription: subscription.serializedSubscriptionInfo,
      },
    }
  }

  public async update({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const subscription = await Subscription.query().where({ userId: user.id }).firstOrFail()
    const { isCanceled } = await request.validate(UpdateSubscriptionValidator)
    // TODO call stripe here
    const updateSubscription = await subscription.merge({ isCanceled }).save()

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

    // TODO call stripe here
    await subscription.merge({ isDeleted: true }).save()

    return {
      data: {
        message: 'Subscription deleted successfully',
      },
    }
  }
}
