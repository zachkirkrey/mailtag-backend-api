import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Subscription/SubscriptionController.show')
  Route.post('', 'Subscription/SubscriptionController.create')
  Route.patch('', 'Subscription/SubscriptionController.update')
  Route.delete('', 'Subscription/SubscriptionController.destroy')
})
  .prefix('subscription')
  .middleware('auth')
