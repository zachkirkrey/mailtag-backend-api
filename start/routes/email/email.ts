import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(':id', 'Email/EmailController.show')
  Route.post('', 'Email/EmailController.create')
  Route.delete(':id', 'Email/EmailController.destroy')
})
  .prefix('emails')
  .middleware('auth')
