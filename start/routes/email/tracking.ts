import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'Email/EmailTrackingController.index')
})
  .prefix('tracking-pixels')
  .middleware('auth')
