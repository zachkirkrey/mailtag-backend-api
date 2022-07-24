import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('', 'Support/TicketsController.create')
})
  .prefix('support-tickets')
  .middleware('auth')
