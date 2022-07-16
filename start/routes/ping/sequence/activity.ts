import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Ping/PingSequenceActivityController.index')
  Route.get(':id', 'Ping/PingSequenceActivityController.show')
  Route.post('', 'Ping/PingSequenceActivityController.create')
  Route.patch(':id', 'Ping/PingSequenceActivityController.update')
  Route.delete(':id', 'Ping/PingSequenceActivityController.destroy')
})
  .prefix('ping-sequence-activities')
  .middleware('auth')
