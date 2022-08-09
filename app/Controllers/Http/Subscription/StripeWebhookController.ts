import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stripe from '@ioc:Adonis/Addons/Stripe'
import { default as Stripe2 } from 'stripe'
import Env from '@ioc:Adonis/Core/Env'
import CreateSubsciption from 'App/Services/Subscription/CreateSubscription'

export default class StripeWebhookController {
  public async stripeWebhook({ request }: HttpContextContract) {
    // TODO: move this to request helper, getStripeEvent. It should get request object as parameter.
    const event = Stripe.webhooks.constructEvent(
      request.raw()!,
      request.header('stripe-signature')!,
      Env.get('STRIPE_WEBHOOK_SECRET')
    )

    switch (event.type) {
      case 'invoice.payment_succeeded': {
        // This event means subscription is creaqted and payment was succesful
        const subscription = event.data.object as Stripe2.Invoice

        const service = new CreateSubsciption(subscription)
        const resultFixme = await service.call()

        return resultFixme
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
