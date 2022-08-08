import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(':id', 'Account/AccountController.show')
})
  .prefix('accounts')
  .middleware('auth')
