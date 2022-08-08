import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PingSequenceActivity from 'App/Models/PingSequenceActivity'
import User from 'App/Models/User'
import GetPingSequenceActivityByIdValidator from 'App/Validators/Ping/GetPingSequenceActivityByIdValidator'
import CreatePingSequenceActivityValidator from 'App/Validators/Ping/CreatePingSequenceActivityValidator'
import UpdatePingSequenceActivityValidator from 'App/Validators/Ping/UpdatePingSequenceActivityValidator'
import Config from '@ioc:Adonis/Core/Config'

export default class PingSequenceActivityController {
  public async index({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const page: number = request.input('page', Config.get('app.pagination.page'))
    const limit: number = request.input('limit', Config.get('app.pagination.limit'))
    const pingSequenceActivities = await PingSequenceActivity.query()
      .where({ userId: user.id })
      .paginate(page, limit)
    return pingSequenceActivities.serialize()
  }

  public async show({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingSequenceActivityByIdValidator)
    const pingSequenceActivity = await PingSequenceActivity.query()
      .where({
        id: params.id,
        userId: user.id,
      })
      .firstOrFail()

    return {
      data: {
        pingSequenceActivity: pingSequenceActivity.serialize(),
      },
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { pingSequenceId, status } = await request.validate(CreatePingSequenceActivityValidator)
    const pingSequenceActivity = await PingSequenceActivity.create({
      userId: user.id,
      pingSequenceId,
      status,
    })

    return {
      data: {
        message: 'Ping sequence activity created successfully',
        pingSequenceActivity: pingSequenceActivity.serialize(),
      },
    }
  }

  public async update({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingSequenceActivityByIdValidator)
    const pingSequenceActivity = await PingSequenceActivity.query()
      .where({
        id: params.id,
        userId: user.id,
      })
      .firstOrFail()
    const { status } = await request.validate(UpdatePingSequenceActivityValidator)

    await pingSequenceActivity.merge({ status }).save()
    await pingSequenceActivity.refresh()

    return {
      data: {
        message: 'Ping sequence activity updated successfully',
        pingSequenceActivity: pingSequenceActivity.serialize(),
      },
    }
  }

  public async destroy({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingSequenceActivityByIdValidator)
    const pingSequenceActivity = await PingSequenceActivity.query()
      .where({
        id: params.id,
        userId: user.id,
      })
      .firstOrFail()

    await pingSequenceActivity.delete()

    return {
      data: {
        message: 'Ping sequence activity deleted successfully',
      },
    }
  }
}
