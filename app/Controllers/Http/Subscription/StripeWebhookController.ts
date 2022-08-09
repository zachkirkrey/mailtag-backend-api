import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stripe from 'stripe'
import CreateSubsciption from 'App/Services/Subscription/CreateSubscription'
import { getStripeEvent } from 'App/Helpers/stripe'

export default class StripeWebhookController {
  public async stripeWebhook({ request }: HttpContextContract) {
    const event = await getStripeEvent(request)

    switch (event.type) {
      case 'invoice.payment_succeeded': {
        // This event means subscription is creaqted and payment was succesful
        const invoice = event.data.object as Stripe.Invoice

        const service = new CreateSubsciption(invoice)
        await service.call()

        return response.status(201)
      }

      case 'customer.subscription.updated': {
        // const subscription = event.data.object as Whatever
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break
      }

      case 'customer.subscription.deleted': {
        // const subscription = event.data.object
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break
      }

      case 'invoice.payment_failed': {
        // TODO: handle this case

        // const subscription = event.data.object
        // const { status } = subscription
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break
      }
      default:
        throw new Error('Unknown event type from stripe')
    }
  }
}
