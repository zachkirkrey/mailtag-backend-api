import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(':id', 'Email/EmailEventController.show')
  Route.post(':emailId', 'Email/EmailEventController.create')
  Route.delete(':id', 'Email/EmailEventController.destroy')
  Route.get(':emailId.png', 'Email/EmailEventController.track')
})
  .prefix('email-events')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
