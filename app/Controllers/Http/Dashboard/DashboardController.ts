import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { LOCAL_DATE_WITH_PARAMS, YEAR } from 'App/Helpers/date'
import { ChartFilterRanges } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import Link from 'App/Models/Link'
import ChartStatsDateRange from 'App/Services/Dashboard/ChartStatsDateRange'
import DashboardInfo from 'App/Services/Dashboard/DashboardInfo'
import GetChartStatsValidator from 'App/Validators/Dashboard/GetChartStatsValidator'
import { DateTime } from 'luxon'

export default class DashboardController {
  public async getEmailsSentToday(ctx: HttpContextContract) {
    const service = new DashboardInfo(ctx)
    const emails = await service.getEmailsSentToday()

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getEmailsSentMonth(ctx: HttpContextContract) {
    const service = new DashboardInfo(ctx)
    const emails = await service.getEmailsSentMonth()

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getAverageOpenRate(ctx: HttpContextContract) {
    const service = new DashboardInfo(ctx)
    const averageOpenRate = await service.getAverageOpenRate()

    return {
      data: {
        averageOpenRate,
      },
    }
  }

  public async getAverageLinkClickRate(ctx: HttpContextContract) {
    const service = new DashboardInfo(ctx)
    const averageLinkClickRate = await service.getAverageLinkClickRate()

    return {
      data: {
        averageLinkClickRate,
      },
    }
  }

  public async getRecentlyReadEmails(ctx: HttpContextContract) {
    const service = new DashboardInfo(ctx)
    const emails = await service.getRecentlyReadEmails()

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getRecentlyUnreadEmails(ctx: HttpContextContract) {
    const service = new DashboardInfo(ctx)
    const emails = await service.getRecentlyUnreadEmails()

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getReadEmails({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const emails = await Email.query().where({ userId: user.id }).andHas('events')

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getUnreadEmails({ auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const emails = await Email.query().where({ userId: user.id }).andDoesntHave('events')

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getSignatureClicks(ctx: HttpContextContract) {
    const service = new DashboardInfo(ctx)
    const signatures = await service.getSignatureClicks()

    return {
      data: {
        count: signatures.length,
        signatures,
      },
    }
  }

  public async getPings(ctx: HttpContextContract) {
    const service = new DashboardInfo(ctx)
    const pings = await service.getPings()

    return {
      data: {
        count: pings.length,
        pings,
      },
    }
  }

  public async getChartStats({ auth, request }: HttpContextContract) {
    const user = auth.use('api').user!
    const { range, start, end } = await request.validate(GetChartStatsValidator)
    const isCustomRange = !!(start && end)
    const ranges = new ChartStatsDateRange(isCustomRange ? ChartFilterRanges.CUSTOM : range!)
    const { startDate, endDate } = ranges.getDates(start!, end!)
    const [emailsSent, emailsRead, emailsUnread] = await Promise.all([
      Email.query().where({ userId: user.id }).andWhereBetween('created_at', [startDate, endDate]),
      Email.query()
        .where({ userId: user.id })
        .andHas('events')
        .andWhereBetween('created_at', [startDate, endDate]),
      Email.query()
        .where({ userId: user.id })
        .andDoesntHave('events')
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
        .andHas('events')
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
      .andDoesntHave('events')
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
      .andHas('events')
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
      .andHas('events')
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
      .andDoesntHave('events')
      .orderBy('created_at', 'desc')
      .limit(3)

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

  public async getDashboardInfo(ctx: HttpContextContract) {
    const service = new DashboardInfo(ctx)

    const [
      emailsSentToday,
      emailsSentThisMonth,
      averageOpenRate,
      averageLinkClickRate,
      recentlyReadEmails,
      recentlyUnreadEmails,
      signatureClicks,
      pings,
    ] = await Promise.all([
      service.getEmailsSentToday(),
      service.getEmailsSentMonth(),
      service.getAverageOpenRate(),
      service.getAverageLinkClickRate(),
      service.getRecentlyReadEmails(),
      service.getRecentlyUnreadEmails(),
      service.getSignatureClicks(),
      service.getPings(),
    ])

    return {
      data: {
        emailsSentToday: emailsSentToday.length,
        emailsSentThisMonth: emailsSentThisMonth.length,
        averageOpenRate,
        averageLinkClickRate,
        recentlyReadEmails: recentlyReadEmails.length,
        recentlyUnreadEmails: recentlyUnreadEmails.length,
        signatureClicks: signatureClicks.length,
        pings: pings.length,
      },
    }
  }
}
