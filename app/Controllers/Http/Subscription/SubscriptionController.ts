import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import User from 'App/Models/User'
import CreateSubscriptionValidator from 'App/Validators/Subscription/CreateSubscriptionValidator'
import UpdateSubscriptionValidator from 'App/Validators/Subscription/UpdateSubscriptionValidator'

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
    // TODO add stripe call here
    const subscription = await Subscription.create({ userId: user.id, planId, paymentStatus })

    return {
      data: {
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
