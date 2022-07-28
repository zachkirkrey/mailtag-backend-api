import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Ping/PingSequenceDetailController.index')
  Route.get(':id', 'Ping/PingSequenceDetailController.show')
  Route.post('', 'Ping/PingSequenceDetailController.create')
  Route.patch(':id', 'Ping/PingSequenceDetailController.update')
  Route.delete(':id', 'Ping/PingSequenceDetailController.destroy')
  Route.post(':id/send-preview', 'Ping/PingSequenceDetailController.sendPreviewEmail')
})
  .prefix('ping-sequence-details')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
