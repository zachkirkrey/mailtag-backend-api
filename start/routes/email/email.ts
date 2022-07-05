import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'Email/EmailController.index')
  Route.get(':id', 'Email/EmailController.show')
  Route.post('/', 'Email/EmailController.create')
  Route.delete(':id', 'Email/EmailController.destroy')
  Route.group(() => {
    Route.post('', 'Email/EmailController.createEmailEvent')
  }).prefix('events')
})
  .prefix('emails')
  .middleware('auth')
