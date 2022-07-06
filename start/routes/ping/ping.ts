import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Ping/PingController.index')
  Route.get(':id', 'Ping/PingController.show')
  Route.post('', 'Ping/PingController.create')
  Route.delete(':id', 'Ping/PingController.destroy')
})
  .prefix('pings')
  .middleware('auth')
