import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('upload', 'File/FileController.upload')
})
  .prefix('files')
  .middleware('auth')
