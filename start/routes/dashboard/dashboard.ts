import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('emails-sent-today', 'Dashboard/DashboardController.getEmailsSentToday')
  Route.get('emails-sent-month', 'Dashboard/DashboardController.getEmailsSentMonth')
  Route.get('average-open-rate', 'Dashboard/DashboardController.getAverageOpenRate')
  Route.get('average-link-click-rate', 'Dashboard/DashboardController.getAverageLinkClickRate')
  Route.get('recently-opened-emails', 'Dashboard/DashboardController.getRecentlyOpenedEmails')
  Route.get('unread-emails', 'Dashboard/DashboardController.getUnreadEmails')
  Route.get('signature-clicks', 'Dashboard/DashboardController.getSignatureClicks')
  Route.get('pings', 'Dashboard/DashboardController.getPings')
})
  .prefix('dashboard')
  .middleware('auth')
