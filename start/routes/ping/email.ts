import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Ping/PingEmailController.index')
  Route.get(':id', 'Ping/PingEmailController.show')
  Route.post('', 'Ping/PingEmailController.create')
  Route.patch(':id', 'Ping/PingEmailController.update')
  Route.delete(':id', 'Ping/PingEmailController.destroy')
  Route.patch('/:id/start', 'Ping/PingEmailController.start')
  Route.patch('/:id/stop', 'Ping/PingEmailController.stop')
  Route.patch('/:id/restart', 'Ping/PingEmailController.restart')
  Route.get('/search', 'Ping/PingEmailController.search')
})
  .prefix('ping-emails')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
