import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/google/callback', 'Auth/AuthController.googleCallback')
  Route.get('/google', async ({ ally }) => {
    return ally.use('google').redirect()
  })
}).prefix('/auth')
