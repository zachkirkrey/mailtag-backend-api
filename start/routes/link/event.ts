import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Link/LinkEventController.show')
})
  .prefix('link-events')
  .middleware('auth')
