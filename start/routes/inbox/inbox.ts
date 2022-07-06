import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('emails', 'Inbox/InboxController.getEmails')
  Route.get('read-emails/:id', 'Inbox/InboxController.getReadEmailById')
  Route.get('unread-emails/:id', 'Inbox/InboxController.getUnreadEmailById')
})
  .prefix('inbox')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
