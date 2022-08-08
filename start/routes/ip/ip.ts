import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('', 'Ip/IpController.show')
})
  .prefix('ip-location')
  .middleware('auth')
