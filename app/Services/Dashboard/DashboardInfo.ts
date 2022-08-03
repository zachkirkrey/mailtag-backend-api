import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { compare } from 'App/Helpers/number'
import Email from 'App/Models/Email'
import Link from 'App/Models/Link'
import Ping from 'App/Models/Ping'
import Signature from 'App/Models/Signature'
import { DateTime } from 'luxon'

export default class DashboardInfo {
  constructor(private ctx: HttpContextContract) {}

  private user = this.ctx.auth.use('api').user!
  private today = DateTime.local()

  public async getEmailsSentToday() {
    // TODO optimize queries or add isWithState
    const [emailsSentToday, emailsSentYesterday] = await Promise.all([
      Email.query()
        .where({ userId: this.user.id })
        .andWhereBetween('created_at', [
          this.today.startOf('day').toSQL(),
          this.today.endOf('day').toSQL(),
        ]),

      Email.query()
        .where({ userId: this.user.id })
        .andWhereBetween('created_at', [
          this.today.minus({ day: 1 }).startOf('day').toSQL(),
          this.today.minus({ day: 1 }).endOf('day').toSQL(),
        ])
        .count('id as emailsSentYesterdayCount')
        .first(),
    ])

    return {
      emails: emailsSentToday,
      state: compare(
        emailsSentToday.length,
        Number(emailsSentYesterday?.$extras.emailsSentYesterdayCount)
      ),
    }
  }

  public async getEmailsSentMonth() {
    const [emailsSentThisMonth, emailsSentLastMonth] = await Promise.all([
      Email.query()
        .where({ userId: this.user.id })
        .andWhereBetween('created_at', [
          this.today.startOf('month').toSQL(),
          this.today.endOf('month').toSQL(),
        ]),

      Email.query()
        .where({ userId: this.user.id })
        .andWhereBetween('created_at', [
          this.today.minus({ month: 1 }).startOf('month').toSQL(),
          this.today.minus({ month: 1 }).endOf('month').toSQL(),
        ])
        .count('id as emailsSentLastMonthCount')
        .first(),
    ])

    return {
      emails: emailsSentThisMonth,
      state: compare(
        emailsSentThisMonth.length,
        Number(emailsSentLastMonth?.$extras.emailsSentLastMonthCount)
      ),
    }
  }

  public async getAverageOpenRate() {
    // TODO: use withCount methods to do single query and consume less memory
    const [emails, emailsOpened, emailsSentYesterday, emailsOpenedYesterday] = await Promise.all([
      Email.query().where({ userId: this.user.id }),

      Email.query().where({ userId: this.user.id }).andHas('events'),

      Email.query()
        .where({ userId: this.user.id })
        .andWhere('created_at', '<=', this.today.minus({ day: 1 }).toSQLDate())
        .count('id as emailsSentYesterdayCount')
        .first(),

      Email.query()
        .where({ userId: this.user.id })
        .andHas('events')
        .andWhere('created_at', '<=', this.today.minus({ day: 1 }).toSQLDate())
        .count('id as emailsOpenedYesterdayCount')
        .first(),
    ])

    const averageOpenRate = (emailsOpened.length / emails.length) * 100
    const previousAverageOpenRate =
      (Number(emailsSentYesterday?.$extras.emailsSentYesterdayCount) /
        Number(emailsOpenedYesterday?.$extras.emailsOpenedYesterdayCount)) *
      100

    return {
      rate: averageOpenRate ? averageOpenRate.toFixed() : 0,
      state: compare(averageOpenRate, previousAverageOpenRate),
    }
  }

  public async getAverageLinkClickRate() {
    const emails = await Email.query().where({ userId: this.user.id })
    const emailsIds = emails.map((email) => email.id)
    // TODO: use withCount methods to do single query and consume less memory
    const [links, linksClicked, previousLinks, previousLinksClicked] = await Promise.all([
      Link.query().whereIn('email_id', emailsIds),

      Link.query().whereIn('email_id', emailsIds).andHas('events'),

      Link.query()
        .whereIn('email_id', emailsIds)
        .andWhere('created_at', '<=', this.today.minus({ day: 1 }).toSQLDate())
        .count('id as previousLinksCount')
        .first(),

      Link.query()
        .whereIn('email_id', emailsIds)
        .andHas('events')
        .andWhere('created_at', '<=', this.today.minus({ day: 1 }).toSQLDate())
        .count('id as previousLinksClickedCount')
        .first(),
    ])

    const averageLinkClickRate = (linksClicked.length / links.length) * 100
    const previousAverageLinkClickRate =
      (Number(previousLinks?.$extras.previousLinksCount) /
        Number(previousLinksClicked?.$extras.previousLinksClickedCount)) *
      100

    return {
      rate: averageLinkClickRate ? averageLinkClickRate.toFixed() : 0,
      state: compare(averageLinkClickRate, previousAverageLinkClickRate),
    }
  }

  // TODO move duplicated to vars
  public async getRecentlyReadEmails() {
    const emails = await Email.query()
      .where({ userId: this.user.id })
      .andHas('events')
      .andWhereBetween('created_at', [
        this.today.minus({ days: 5 }).startOf('day').toSQL(),
        this.today.endOf('day').toSQL(),
      ])

    return emails
  }

  public async getRecentlyUnreadEmails() {
    const emails = await Email.query()
      .where({ userId: this.user.id })
      .andDoesntHave('events')
      .andWhereBetween('created_at', [
        this.today.minus({ days: 5 }).startOf('day').toSQL(),
        this.today.endOf('day').toSQL(),
      ])

    return emails
  }

  public async getSignatureClicks() {
    const signatures = await Signature.query()
      .where({ userId: this.user.id })
      .andHas('events')
      .preload('user')

    return signatures
  }

  public async getPings() {
    const pings = await Ping.query()
      .whereHas('email', (emailQuery) => emailQuery.where({ userId: this.user.id }))
      .andHas('events')
      .preload('events')

    return pings
  }
}
