import Logger from '@ioc:Adonis/Core/Logger'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stripe from 'stripe'
import CreateSubsciption from 'App/Services/Subscription/CreateSubscription'
import Subscription from 'App/Models/Subscription'
import { getStripeEvent } from 'App/Helpers/stripe'
import Plan from 'App/Models/Plan'

export default class StripeWebhookController {
  public async stripeWebhook({ request, response }: HttpContextContract) {
    const event = await getStripeEvent(request)

    switch (event.type) {
      case 'invoice.payment_succeeded': {
        // This event means subscription is created and payment was succesful
        const invoice = event.data.object as Stripe.Invoice

        const service = new CreateSubsciption(invoice)
        await service.call()

        return response.status(201)
      }

      case 'invoice.payment_failed': {
        const subscriptionEvent = event.data.object as Stripe.Subscription
        const paymentStatus = subscriptionEvent.status === 'active' ? 'paid' : 'unpaid'

        const subscription = await Subscription.findByOrFail(
          'stripeSubscriptionId',
          subscriptionEvent.id
        )
        await subscription.merge({ paymentStatus }).save()

        return response.status(200)
      }

      case 'customer.subscription.updated': {
        const subscriptionEvent = event.data.object as Stripe.Subscription

        const { status, items } = subscriptionEvent
        const stripePlanId = items.data[0].price.id
        const paymentStatus = status === 'active' ? 'paid' : 'unpaid'

        const [plan, subscription] = await Promise.all([
          Plan.query().where({ stripePlanId: stripePlanId }).firstOrFail(),
          Subscription.findByOrFail('stripeSubscriptionId', subscriptionEvent.id),
        ])

        await subscription.merge({ planId: plan.id, paymentStatus }).save()

        return response.status(200)
      }

      case 'customer.subscription.deleted': {
        const subscriptionEvent = event.data.object as Stripe.Subscription
        const { status } = subscriptionEvent
        const paymentStatus = status === 'active' ? 'paid' : 'unpaid'

        const subscription = await Subscription.findByOrFail(
          'stripeSubscriptionId',
          subscriptionEvent.id
        )
        await subscription.merge({ paymentStatus }).save()

        return response.status(200)
      }

      case 'customer.deleted': {
        // Customer is deleted at the stripe, along with their subscription
        const customerEvent = event.data.object as Stripe.Customer

        const subscription = await Subscription.findBy('stripeCustomerId', customerEvent.id)
        if (!subscription) {
          return response.status(204)
        }

        await subscription.delete()

        return response.status(200)
      }

      default: {
        Logger.info(`Unknown event type from stripe, ${event.type}`)

        return response.status(204)
      }
    }
  }
}
