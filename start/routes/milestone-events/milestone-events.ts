import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'MilestoneEvent/MilestoneEventController.index')
})
  .prefix('milestone-events')
  .middleware('auth')
