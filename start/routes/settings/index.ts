import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Settings/SettingsController.get')
  Route.patch('', 'Settings/SettingsController.update')
})
  .prefix('settings')
  .middleware('auth')
