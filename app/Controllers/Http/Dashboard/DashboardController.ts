import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { daysAgo, monthsAgo } from 'App/Helpers/date'
import Email from 'App/Models/Email'
import Link from 'App/Models/Link'
import Signature from 'App/Models/Signature'

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

  public async getAverageLinkClickRate({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const emails = await Email.query().where({ userId: user.id })
    const emailsIds = emails.map((email) => email.id)
    const [links, linksClicked] = await Promise.all([
      Link.query().whereIn('email_id', emailsIds),
      Link.query().whereIn('email_id', emailsIds).has('events'),
    ])
    const averageLinkClickRate = (linksClicked.length / links.length) * 100

    return {
      data: {
        averageLinkClickRate,
      },
    }
  }

  public async getRecentlyOpenedEmails({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const fiveDaysAgo = daysAgo(5).toSQLDate()
    const emails = await Email.query()
      .where({ userId: user.id })
      .andWhere('created_at', '>=', fiveDaysAgo)

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getUnreadEmails({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const emails = await Email.query().where({ userId: user.id }).doesntHave('events')

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getSignatureClicks({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const signatures = await Signature.query()
      .where({ userId: user.id })
      .has('events')
      .preload('user')

    return {
      data: {
        count: signatures.length,
        signatures,
      },
    }
  }
}
