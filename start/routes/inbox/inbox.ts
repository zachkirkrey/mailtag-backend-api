import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'Dashboard/DashboardController.getEmailsSentToday')
})
  .prefix('inbox')
  .middleware('auth')
