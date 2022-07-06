import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Email from 'App/Models/Email'
import ReadEmail from 'App/Models/ReadEmail'
import UnreadEmail from 'App/Models/UnreadEmail'
import User from 'App/Models/User'
import GetEmailByIdValidator from 'App/Validators/GetEmailByIdValidator'

export default class InboxController {
  public async getEmails({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const [readEmails, unreadEmails] = await Promise.all([
      ReadEmail.query().where({ userId: user.id }).preload('activities').preload('email'),
      UnreadEmail.query().where({ userId: user.id }).preload('activities').preload('email'),
    ])

    return {
      data: {
        readEmails: readEmails.map((readEmail) => readEmail.serializedEmailInfo),
        unreadEmails: unreadEmails.map((unreadEmail) => unreadEmail.serializedEmailInfo),
      },
    }
  }

  public async getReadEmailById({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetEmailByIdValidator)
    const email = await Email.query()
      .where({ id: params.id, userId: user.id })
      .andHas('events')
      .preload('readEmail', (query) => query.preload('activities'))
      .firstOrFail()

    return {
      data: {
        recipient: email.recipient,
        first_opened: email.readEmail.createdAt,
        read_times: email.readEmail.readTimes,
        device: email.readEmail.device,
        activities: email.readEmail.activities,
      },
    }
  }

  public async getUnreadEmailById({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetEmailByIdValidator)
    const email = await Email.query()
      .where({ id: params.id, userId: user.id })
      .andDoesntHave('events')
      .preload('unreadEmail', (query) => query.preload('activities'))
      .firstOrFail()

    return {
      data: {
        recipient: email.recipient,
        activities: email.unreadEmail.activities,
      },
    }
  }
}
