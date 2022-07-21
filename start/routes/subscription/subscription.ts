import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Subscription/SubscriptionController.index')
  Route.get(':id', 'Subscription/SubscriptionController.show')
  Route.post('', 'Subscription/SubscriptionController.create')
  Route.patch(':id', 'Subscription/SubscriptionController.update')
  Route.delete(':id', 'Subscription/SubscriptionController.destroy')
})
  .prefix('subscription')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
