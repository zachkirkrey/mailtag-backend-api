import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Email from 'App/Models/Email'
import EmailEvent from 'App/Models/EmailEvent'
import User from 'App/Models/User'
import CreateEmailEventValidator from 'App/Validators/CreateEmailEventValidator'
import GetEmailByIdValidator from 'App/Validators/GetEmailByIdValidator'

export default class EmailController {
  public async index({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const emails = await Email.query().where({ userId: user.id }).preload('events')

    return {
      data: {
        count: emails.length,
        emails,
      },
    }
  }

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

  public async destroy({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetEmailByIdValidator)

    const email = await Email.query().where({ userId: user.id, id: params.id }).firstOrFail()

    await email.delete()

    return {
      data: {
        message: 'Email deleted successfully',
      },
    }
  }

  public async createEmailEvent({ request }: HttpContextContract) {
    const { emailId, device, userAgent, location } = await request.validate(
      CreateEmailEventValidator
    )
    const emailEvent = await EmailEvent.create({ emailId, device, userAgent, location })

    return {
      data: {
        message: 'Email event created successfully',
        emailEvent,
      },
    }
  }
}
