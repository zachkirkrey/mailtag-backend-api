import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'Subscription/StripeWebhookController.stripeWebhook')
}).prefix('subscription/stripe-webhook')
