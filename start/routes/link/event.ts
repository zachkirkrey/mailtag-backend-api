import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(':linkId', 'Link/LinkEventController.index')
  Route.post('', 'Link/LinkEventController.create')
})
  .prefix('link-events')
  .middleware('auth')
