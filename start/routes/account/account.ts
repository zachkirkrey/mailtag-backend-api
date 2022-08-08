import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Route.get('', 'Account/AccountController.index')
})
  .prefix('accounts')
  .middleware('auth')
