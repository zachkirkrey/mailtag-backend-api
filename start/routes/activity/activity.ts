import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(':id', 'Activity/ActivityController.show')
  Route.post(':id', 'Activity/ActivityController.create')
  Route.delete(':id', 'Activity/ActivityController.destroy')
})
  .prefix('activities')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
