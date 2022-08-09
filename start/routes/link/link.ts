import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Link/LinkController.index')
  Route.post('', 'Link/LinkController.create')
})
  .prefix('links')
  .middleware('auth')
