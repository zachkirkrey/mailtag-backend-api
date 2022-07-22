import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Team/TeamInviteController.index')
  Route.get(':id', 'Team/TeamInviteController.show')
  Route.post('', 'Team/TeamInviteController.create')
  Route.patch(':id', 'Team/TeamInviteController.update')
  Route.delete(':id', 'Team/TeamInviteController.destroy')
  Route.patch(':id/accept', 'Team/TeamInviteController.accept')
})
  .prefix('team-invites')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
