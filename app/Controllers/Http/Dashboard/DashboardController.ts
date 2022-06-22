import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { daysAgo, monthsAgo } from 'App/Helpers/date'
import Email from 'App/Models/Email'

export default class DashboardController {
  public async getEmailsSentToday({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    // TODO query based on this day not bigger than a day ago
    const oneDayAgo = daysAgo(1).toSQLDate()
    const emails = await Email.query()
      .where({ userId: user.id })
      .andWhere('created_at', '>=', oneDayAgo)

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getEmailsSentMonth({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const oneMonthAgo = monthsAgo(1).toSQLDate()
    const emails = await Email.query()
      .where({ userId: user.id })
      .andWhere('created_at', '>=', oneMonthAgo)

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getAverageOpenRate({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const [emails, emailsOpened] = await Promise.all([
      Email.query().where({ userId: user.id }),
      Email.query().where({ userId: user.id }).has('events'),
    ])
    const averageOpenRate = (emailsOpened.length / emails.length) * 100

    return {
      data: {
        averageOpenRate,
      },
    }
  }

  // public async getAverageLinkClickRate({ auth }: HttpContextContract) {
  //   return 'average link click rate'
  // }
}
