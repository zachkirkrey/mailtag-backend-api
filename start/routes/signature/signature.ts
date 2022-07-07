import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Signature/SignatureController.index')
  Route.get(':id', 'Signature/SignatureController.show')
  Route.post('', 'Signature/SignatureController.create')
  Route.delete(':id', 'Signature/SignatureController.destroy')
})
  .prefix('signatures')
  .middleware('auth')
  .where('id', Route.matchers.uuid())
