import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(':id', 'Signature/SignatureController.get')
}).prefix('signature-events')
