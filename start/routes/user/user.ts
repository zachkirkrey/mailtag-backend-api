import Route from '@ioc:Adonis/Core/Route'

// TODO add api middleware
Route.group(() => {
  Route.resource('users', 'User/UsersController').apiOnly()
})
