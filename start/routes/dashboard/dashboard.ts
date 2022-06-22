import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('emails-sent-today', 'Dashboard/DashboardController.getEmailsSentToday')
  Route.get('emails-sent-month', 'Dashboard/DashboardController.getEmailsSentMonth')
  Route.get('average-open-rate', 'Dashboard/DashboardController.getAverageOpenRate')
})
  .prefix('dashboard')
  .middleware('auth')
