import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { daysAgo } from 'App/Helpers/date'
import Email from 'App/Models/Email'

export default class DashboardController {
  public async getEmailsSentToday({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const oneDayAgo = daysAgo(1).toSQLDate()
    const emails = await Email.query()
      .where({ userId: user.id })
      .andWhere('created_at', '>=', oneDayAgo)

    return {
      data: {
        emails,
      },
    }
  }
}
