import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Email from 'App/Models/Email'
import User from 'App/Models/User'
import GetEmailByIdValidator from 'App/Validators/GetEmailByIdValidator'

export default class EmailController {
  public async show({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetEmailByIdValidator)
    const email = await Email.query()
      .where({ id: params.id, userId: user.id })
      .preload('events')
      .firstOrFail()

    return {
      data: {
        email,
      },
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    // TODO add validator
    const { recipient, subject, gmailMessageId, gmailThreadId } = request.body()

    const email = await Email.create({
      userId: user.id,
      recipient,
      subject,
      gmailMessageId,
      gmailThreadId,
    })

    return {
      data: {
        message: 'Email created successfully',
        email,
        user,
      },
    }
  }
}
