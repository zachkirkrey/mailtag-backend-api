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
  Route.get('chart-stats', 'Dashboard/DashboardController.getChartStats')
  Route.get(
    'average-link-click-rate-month/:month',
    'Dashboard/DashboardController.getAverageLinkClickRatePerMonth'
  ).where('month', Route.matchers.number())
  Route.get('unread-emails-today', 'Dashboard/DashboardController.getUnreadEmailsToday')
  Route.get('read-emails-today', 'Dashboard/DashboardController.getReadEmailsToday')
  Route.get('recent-emails', 'Dashboard/DashboardController.getRecentEmails')
  Route.get('recent-read-emails', 'Dashboard/DashboardController.getRecentReadEmails')
  Route.get('recent-unread-emails', 'Dashboard/DashboardController.getRecentUnreadEmails')
})
  .prefix('dashboard')
  .middleware('auth')
