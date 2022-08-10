import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'Email/OptimisedEmailSummaryController.index')
})
  .prefix('optimised-email-summary')
  .middleware('auth')
