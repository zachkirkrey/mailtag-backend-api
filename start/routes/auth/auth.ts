import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('google/callback', 'Auth/AuthController.login')
  Route.get('google', async ({ ally }) => {
    return ally.use('google').redirect()
  })
  Route.post('logout', 'Auth/AuthController.logout')
  Route.post('renew-access', 'Auth/AuthController.renewAccess')
}).prefix('auth')
