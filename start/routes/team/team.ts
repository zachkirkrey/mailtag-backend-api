import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Team/TeamController.show')
  Route.post('', 'Team/TeamController.create')
  Route.patch('', 'Team/TeamController.update')
  Route.delete('', 'Team/TeamController.destroy')
  Route.get('stats', 'Team/TeamController.stats')
})
  .prefix('team')
  .middleware('auth')
