import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('', 'Email/EmailController.create')
})
  .prefix('emails')
  .middleware('auth')
