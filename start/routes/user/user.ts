import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('me', 'User/UsersController.profile')
  Route.get(':id', 'User/UsersController.show')
  Route.put(':id', 'User/UsersController.update')
})
  .prefix('users')
  .middleware('auth')
