import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Ping/PingSequenceController.index')
  Route.get(':id', 'Ping/PingSequenceController.show')
  Route.post('', 'Ping/PingSequenceController.create')
  Route.patch(':id', 'Ping/PingSequenceController.update')
  Route.delete(':id', 'Ping/PingSequenceController.destroy')
})
  .prefix('ping-sequences')
  .middleware('auth')
