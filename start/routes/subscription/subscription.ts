import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Subscription/SubscriptionController.show')
  Route.post('', 'Subscription/SubscriptionController.create')
  Route.patch('', 'Subscription/SubscriptionController.update')
  Route.delete('', 'Subscription/SubscriptionController.destroy')
  Route.post(
    '/create-subscription-intent',
    'Subscription/SubscriptionController.createSubscriptionIntent'
  )
  Route.post(
    '/change-payment-method-intent',
    'Subscription/SubscriptionController.changePaymentMethodIntent'
  )
})
  .prefix('subscription')
  .middleware('auth')
