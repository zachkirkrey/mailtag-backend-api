import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(':id', 'User/UsersController.show')
  Route.put(':id', 'User/UsersController.update')
})
  .prefix('users')
  .middleware('auth')
