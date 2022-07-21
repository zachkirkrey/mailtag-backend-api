import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Plan/PlanController.index')
  Route.get(':id', 'Plan/PlanController.show')
  Route.post('', 'Plan/PlanController.create')
  Route.patch(':id', 'Plan/PlanController.update')
  Route.delete(':id', 'Plan/PlanController.destroy')
})
  .prefix('plans')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
