/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import './routes/auth'
import './routes/user'
import './routes/dashboard'
import './routes/inbox'
import './routes/email'
import './routes/activity'
import './routes/signature'
import './routes/ping'
import './routes/team'
import './routes/coupon'
import './routes/plan'
import './routes/subscription'
import './routes/settings'
import './routes/support'
import './routes/file'
import './routes/milestone-events'
import './routes/invite'
import './routes/ip'

Route.get('/', async () => {
  return { hello: 'mailtag', login: '/auth/google' }
})

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
