import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('', 'Invite/InviteController.invite')
})
  .prefix('invites')
  .middleware('auth')
