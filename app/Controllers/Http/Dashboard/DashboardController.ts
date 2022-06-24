import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { daysAgo, monthsAgo } from 'App/Helpers/date'
import Email from 'App/Models/Email'
import Link from 'App/Models/Link'
import Ping from 'App/Models/Ping'
import Signature from 'App/Models/Signature'
import { DateTime } from 'luxon'

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

  public async getPings({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const pings = await Ping.query()
      .whereHas('email', (emailQuery) => emailQuery.where({ userId: user.id }))
      .andHas('events')
      .preload('events')

    return {
      data: {
        count: pings.length,
        pings,
      },
    }
  }

  public async getChartStats({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const [emailsSent, emailsRead, emailsUnread] = await Promise.all([
      Email.query().where({ userId: user.id }),
      Email.query().where({ userId: user.id }).has('events'),
      Email.query().where({ userId: user.id }).doesntHave('events'),
    ])

    return {
      data: {
        emailsSentCount: emailsSent.length,
        emailsReadCount: emailsRead.length,
        emailsUnreadCount: emailsUnread.length,
      },
    }
  }

  public async getAverageLinkClickRatePerMonth({ auth, params }: HttpContextContract) {
    const user = auth.use('api').user!
    const { month } = params
    const YEAR = DateTime.local().year
    const monthStartDate = DateTime.local(YEAR, month).toSQL()
    const monthEndDate = DateTime.local(YEAR, month + 1).toSQL()
    const emails = await Email.query().where({ userId: user.id })
    const emailsIds = emails.map((email) => email.id)
    const [links, linksClicked] = await Promise.all([
      Link.query().whereIn('email_id', emailsIds),
      Link.query()
        .whereIn('email_id', emailsIds)
        .has('events')
        .andWhereBetween('created_at', [monthStartDate, monthEndDate]),
    ])
    const averageLinkClickRatePerMonth = (linksClicked.length / links.length) * 100

    return {
      data: {
        year: YEAR,
        month: DateTime.local(YEAR, month).monthLong,
        averageLinkClickRatePerMonth,
      },
    }
  }

  public async getUnreadEmailsToday({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const todayDate = DateTime.local(
      DateTime.local().year,
      DateTime.local().month,
      DateTime.local().day
    ).toSQL()
    const emails = await Email.query()
      .where({ userId: user.id })
      .doesntHave('events')
      .andWhere('created_at', '>=', todayDate)

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getReadEmailsToday({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const todayDate = DateTime.local(
      DateTime.local().year,
      DateTime.local().month,
      DateTime.local().day
    ).toSQL()
    const emails = await Email.query()
      .where({ userId: user.id })
      .has('events')
      .andWhere('created_at', '>=', todayDate)

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getRecentEmails({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const emails = await Email.query()
      .where({ userId: user.id })
      .orderBy('created_at', 'desc')
      .limit(3)

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }
}
