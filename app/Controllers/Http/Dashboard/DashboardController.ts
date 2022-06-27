import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { daysAgo, LOCAL_DATE_WITH_PARAMS, monthsAgo, YEAR } from 'App/Helpers/date'
import Email from 'App/Models/Email'
import Link from 'App/Models/Link'
import Ping from 'App/Models/Ping'
import Signature from 'App/Models/Signature'
import ChartStatsDateRange from 'App/Services/ChartStatsDateRange'
import GetChartStatsValidator from 'App/Validators/GetChartStatsValidator'
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

  public async getChartStats({ auth, request }: HttpContextContract) {
    // TODO Custom date range
    const user = auth.use('api').user!
    const { params } = await request.validate(GetChartStatsValidator)

    const ranges = new ChartStatsDateRange(params.range)
    const { startDate, endDate } = ranges.getDates()

    const [emailsSent, emailsRead, emailsUnread] = await Promise.all([
      Email.query().where({ userId: user.id }).andWhereBetween('created_at', [startDate, endDate]),
      Email.query()
        .where({ userId: user.id })
        .has('events')
        .andWhereBetween('created_at', [startDate, endDate]),
      Email.query()
        .where({ userId: user.id })
        .doesntHave('events')
        .andWhereBetween('created_at', [startDate, endDate]),
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
        month: LOCAL_DATE_WITH_PARAMS.monthLong,
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

  public async getRecentReadEmails({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const emails = await Email.query()
      .where({ userId: user.id })
      .has('events')
      .orderBy('created_at', 'desc')
      .limit(3)

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getRecentUnreadEmails({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const emails = await Email.query()
      .where({ userId: user.id })
      .doesntHave('events')
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
