import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PingEmail from 'App/Models/PingEmail'
import User from 'App/Models/User'
import CreatePingEmailValidator from 'App/Validators/Ping/CreatePingEmailValidator'
import GetPingEmailByIdValidator from 'App/Validators/Ping/GetPingEmailByIdValidator'
import UpdatePingEmailValidator from 'App/Validators/Ping/UpdatePingEmailValidator'
import SearchPingEmailValidator from 'App/Validators/Ping/SearchPingEmailValidator'

export default class PingEmailController {
  public async index({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const pingEmails = await PingEmail.query().where({ userId: user.id })

    return {
      data: {
        pingEmails: pingEmails.map((pingEmail) => pingEmail.serializedPingEmailInfo),
      },
    }
  }

  public async show({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingEmailByIdValidator)
    const pingEmail = await PingEmail.query()
      .where({ id: params.id, userId: user.id })
      .firstOrFail()

    return {
      data: {
        pingEmail: pingEmail.serializedPingEmailInfo,
      },
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const {
      recipient,
      name,
      subject,
      status,
      gmailMessageId,
      gmailThreadId,
      emailId,
      pingSequenceId,
    } = await request.validate(CreatePingEmailValidator)
    const pingEmail = await PingEmail.create({
      userId: user.id,
      recipient,
      name,
      subject,
      status,
      gmailMessageId,
      gmailThreadId,
      emailId,
      pingSequenceId,
    })

    return {
      data: {
        message: 'Ping email created successfully',
        pingEmail: pingEmail.serializedPingEmailInfo,
      },
    }
  }

  public async update({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingEmailByIdValidator)
    const pingEmail = await PingEmail.query()
      .where({ id: params.id, userId: user.id })
      .firstOrFail()
    const { name, subject, status } = await request.validate(UpdatePingEmailValidator)

    await pingEmail.merge({ name, subject, status }).save()
    await pingEmail.refresh()

    return {
      data: {
        message: 'Ping email update successfully',
        pingEmail,
      },
    }
  }

  public async destroy({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingEmailByIdValidator)
    const pingEmail = await PingEmail.query()
      .where({ id: params.id, userId: user.id })
      .firstOrFail()

    await pingEmail.delete()

    return {
      data: {
        message: 'Ping email deleted successfully',
      },
    }
  }

  public async start({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingEmailByIdValidator)
    const pingEmail = await PingEmail.query()
      .where({ id: params.id, userId: user.id })
      .firstOrFail()

    // TODO add this operation to SQS or queue service
    await pingEmail.merge({ status: 'started' }).save()
    await pingEmail.refresh()

    return {
      data: {
        message: 'Ping email started successfully',
        pingEmailStatus: pingEmail.status,
      },
    }
  }

  public async stop({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingEmailByIdValidator)
    const pingEmail = await PingEmail.query()
      .where({ id: params.id, userId: user.id })
      .firstOrFail()

    // TODO add this operation to SQS or queue service
    await pingEmail.merge({ status: 'stopped' }).save()
    await pingEmail.refresh()

    return {
      data: {
        message: 'Ping email stopped successfully',
        pingEmailStatus: pingEmail.status,
      },
    }
  }

  public async restart({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingEmailByIdValidator)
    const pingEmail = await PingEmail.query()
      .where({ id: params.id, userId: user.id })
      .firstOrFail()

    // TODO add this operation to SQS or queue service
    await pingEmail.merge({ status: 'stopped' }).save()
    await pingEmail.merge({ status: 'started' }).save()
    await pingEmail.refresh()

    return {
      data: {
        message: 'Ping email restarted successfully',
        pingEmailStatus: pingEmail.status,
      },
    }
  }

  public async search({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { searchTerm } = await request.validate(SearchPingEmailValidator)

    const pingEmails = await PingEmail.query()
      .where({ userId: user.id })
      .andWhere((query) => {
        query.whereILike('subject', `%${searchTerm}%`).orWhereILike('recipient', `%${searchTerm}%`)
      })
      .orderBy([{ column: 'created_at', order: 'desc' }])

    return {
      data: {
        pingEmails: pingEmails.map((pingEmail) => pingEmail.serializedPingEmailInfo),
      },
    }
  }
}