import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Team/TeamController.show')
  Route.post('', 'Team/TeamController.create')
  Route.patch(':id', 'Team/TeamController.update')
  Route.delete(':id', 'Team/TeamController.destroy')
})
  .prefix('team')
  .middleware('auth')
