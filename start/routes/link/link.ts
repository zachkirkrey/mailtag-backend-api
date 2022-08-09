import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Link/LinkController.index')
  Route.post('', 'Link/LinkController.create')
  Route.delete(':id', 'Link/LinkController.destroy')
})
  .prefix('links')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
