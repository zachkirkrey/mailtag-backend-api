import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('google/callback', 'Auth/AuthController.login')
  Route.get('google', async ({ ally }) => {
    return ally.use('google').redirect()
  })
  Route.get('google/callback/local', 'Auth/AuthController.local')
  Route.get('google/local', async ({ ally }) => {
    return ally.use('local').redirect()
  })
  Route.post('logout', 'Auth/AuthController.logout')
  Route.post('renew-access', 'Auth/AuthController.renewAccess')
}).prefix('auth')
