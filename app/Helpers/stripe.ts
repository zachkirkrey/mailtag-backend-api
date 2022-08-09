import { RequestContract } from '@ioc:Adonis/Core/Request'
import Env from '@ioc:Adonis/Core/Env'
import { default as StripeAddon } from '@ioc:Adonis/Addons/Stripe'
import AuthException from 'App/Exceptions/AuthException'
import StripeEvent from 'App/Models/StripeEvent'

const STRIPE_WEBHOOK_SECRET = Env.get('STRIPE_WEBHOOK_SECRET')

export async function getStripeEvent(request: RequestContract) {
  const stripeSignature = request.header('stripe-signature')

  if (!stripeSignature) {
    throw new AuthException('Only stripe is authorized to call this endpoint', 403)
  }

  const event = StripeAddon.webhooks.constructEvent(
    request.raw()!,
    stripeSignature,
    STRIPE_WEBHOOK_SECRET
  )

  await StripeEvent.create({ stripeEventId: event.id, data: event.data.object })

  return event
}
