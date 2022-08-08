import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/invoices', 'Subscription/InvoicesController.index')
  Route.get('/invoices/:id', 'Subscription/InvoicesController.show')
})
  .prefix('subscription/invoices')
  .where('id', Route.matchers.uuid())
  .middleware('auth')
