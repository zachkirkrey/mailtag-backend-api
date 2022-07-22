import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Team/TeamMemberController.index')
  Route.get(':id', 'Team/TeamMemberController.show')
  Route.post('', 'Team/TeamMemberController.create')
  Route.patch(':id', 'Team/TeamMemberController.update')
  Route.delete(':id', 'Team/TeamMemberController.destroy')
})
  .prefix('team-members')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
