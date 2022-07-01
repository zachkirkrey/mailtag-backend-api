import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Email from 'App/Models/Email'
import User from 'App/Models/User'
import GetReadEmailByIdValidator from 'App/Validators/GetReadEmailByIdValidator'

export default class InboxController {
  public async getReadEmailById({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetReadEmailByIdValidator)
    const email = await Email.query()
      .where({ id: params.id, userId: user.id })
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

  public async getUnreadById() {
    return 'its unread email'
  }
}
