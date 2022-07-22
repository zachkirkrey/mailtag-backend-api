import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { daysAgo, monthsAgo } from 'App/Helpers/date'
import Email from 'App/Models/Email'
import Link from 'App/Models/Link'
import Ping from 'App/Models/Ping'
import Signature from 'App/Models/Signature'

export default class DashboardInfo {
  constructor(private ctx: HttpContextContract) {}

  private user = this.ctx.auth.use('api').user!
  private fiveDaysAgo = daysAgo(5).toSQLDate()
  private oneDayAgo = daysAgo(1).toSQLDate()
  private oneMonthAgo = monthsAgo(1).toSQLDate()

  public async getEmailsSentToday() {
    // TODO query based on this day not bigger than a day ago
    const emails = await Email.query()
      .where({ userId: this.user.id })
      .andWhere('created_at', '>=', this.oneDayAgo)

    return emails
  }

  public async getEmailsSentMonth() {
    const emails = await Email.query()
      .where({ userId: this.user.id })
      .andWhere('created_at', '>=', this.oneMonthAgo)

    return emails
  }

  public async getAverageOpenRate() {
    // TODO: use withCount methods to do single query and consume less memory
    const [emails, emailsOpened] = await Promise.all([
      Email.query().where({ userId: this.user.id }),
      Email.query().where({ userId: this.user.id }).andHas('events'),
    ])
    const averageOpenRate = (emailsOpened.length / emails.length) * 100

    return averageOpenRate ? averageOpenRate.toFixed() : 0
  }

  public async getAverageLinkClickRate() {
    const emails = await Email.query().where({ userId: this.user.id })
    const emailsIds = emails.map((email) => email.id)
    // TODO: use withCount methods to do single query and consume less memory
    const [links, linksClicked] = await Promise.all([
      Link.query().whereIn('email_id', emailsIds),
      Link.query().whereIn('email_id', emailsIds).andHas('events'),
    ])
    const averageLinkClickRate = (linksClicked.length / links.length) * 100

    return averageLinkClickRate ? averageLinkClickRate.toFixed() : 0
  }

  public async getRecentlyReadEmails() {
    const emails = await Email.query()
      .where({ userId: this.user.id })
      .andHas('events')
      .andWhere('created_at', '>=', this.fiveDaysAgo)

    return emails
  }

  public async getRecentlyUnreadEmails() {
    const emails = await Email.query()
      .where({ userId: this.user.id })
      .andDoesntHave('events')
      .andWhere('created_at', '>=', this.fiveDaysAgo)

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
