import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Ping/PingEmailController.index')
  Route.get(':id', 'Ping/PingEmailController.show')
  Route.post('', 'Ping/PingEmailController.create')
  Route.patch(':id', 'Ping/PingEmailController.update')
  Route.delete(':id', 'Ping/PingEmailController.destroy')
})
  .prefix('ping-emails')
  .middleware('auth')
