import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'Email/EmailController.index')
  Route.get(':id', 'Email/EmailController.show')
  Route.post('/', 'Email/EmailController.create')
  Route.patch(':id', 'Email/EmailController.update')
  Route.delete(':id', 'Email/EmailController.destroy')
})
  .prefix('emails')
  .middleware('auth')
