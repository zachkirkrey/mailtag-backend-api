import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Email from 'App/Models/Email'
import User from 'App/Models/User'
import GetEmailByIdValidator from 'App/Validators/Email/GetEmailByIdValidator'
import SearchInboxEmailValidator from 'App/Validators/SearchInboxEmailValidator'

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
      },
    }
  }

  public async update({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    // TODO add body validator
    const { recipient, subject } = request.body()
    const { params } = await request.validate(GetEmailByIdValidator)
    const email = await Email.query().where({ id: params.id, userId: user.id }).firstOrFail()

    await email.merge(recipient, subject).save()

    return {
      data: {
        message: 'Email updated successfully',
        email,
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

  public async search({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { searchTerm, only } = await request.validate(SearchInboxEmailValidator)

    const emails = await Email.query()
      .where({ userId: user.id })
      .andWhere((query) => {
        query.whereILike('subject', `%${searchTerm}%`).orWhereILike('recipient', `%${searchTerm}%`)
      })
      .if(only === 'reads', (query) => {
        query.andHas('events')
      })
      .if(only === 'unreads', (query) => {
        query.andDoesntHave('events')
      })
      .preload('events')
      .orderBy([{ column: 'created_at', order: 'desc' }])

    return {
      data: {
        emails: emails.map((email) => email.serializedEmailInfo),
      },
    }
  }
}
