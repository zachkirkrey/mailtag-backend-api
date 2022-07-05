import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(':id', 'Email/EmailEventController.show')
  Route.post('', 'Email/EmailEventController.create')
  Route.delete(':id', 'Email/EmailEventController.destroy')
})
  .prefix('emails/events')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
