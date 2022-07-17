import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Team/TeamController.index')
  Route.get(':id', 'Team/TeamController.show')
  Route.post('', 'Team/TeamController.create')
  Route.patch(':id', 'Team/TeamController.update')
  Route.delete(':id', 'Team/TeamController.destroy')
})
  .prefix('teams')
  .middleware('auth')
