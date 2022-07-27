import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import User from 'App/Models/User'
import CreateSubscriptionValidator from 'App/Validators/Subscription/CreateSubscriptionValidator'
import UpdateSubscriptionValidator from 'App/Validators/Subscription/UpdateSubscriptionValidator'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import CreatePaymentValidator from 'App/Validators/Subscription/CreatePaymentValidator'
import Payment from 'App/Services/Subscription/Payment'
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

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { planId, paymentRequestId } = await request.validate(CreateSubscriptionValidator)

    const service = new Payment(planId)
    const { payment_status: paymentStatus, status } = await service.getPaymentRequest(
      paymentRequestId
    )

    if (paymentStatus !== 'paid' && status !== 'complete') {
      throw new PaymentException('Payment is not done, please pay then try again!', 403)
    }

    // TODO use the same stripe customer for the same user if paid before
    const customer = await Stripe.customers.create({
      email: user.email,
    })

    const subscription = await Subscription.firstOrCreate(
      { userId: user.id },
      {
        userId: user.id,
        planId,
        paymentStatus,
      }
    )

    return {
      data: {
        message: 'Subscription created successfully',
        customer: { id: customer.id, email: customer.email },
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

  public async payment({ request }: HttpContextContract) {
    const { planId } = await request.validate(CreatePaymentValidator)

    const service = new Payment(planId)
    const paymentRequest = await service.createPaymentRequest()

    return {
      data: {
        id: paymentRequest.id,
        url: paymentRequest.url,
      },
    }
  }
}
