import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('me', 'User/UserController.profile')
  Route.get(':id', 'User/UserController.show')
  Route.put(':id', 'User/UserController.update')
  Route.delete('/me', 'User/UserController.destroy')
})
  .prefix('users')
  .middleware('auth')
