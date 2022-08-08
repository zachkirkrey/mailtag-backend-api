import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PingPreviewMail from 'App/Mailers/PingPreviewMail'
import PingSequenceDetail from 'App/Models/PingSequenceDetail'
import User from 'App/Models/User'
import CreatePingSequenceDetailValidator from 'App/Validators/Ping/CreatePingSequenceDetailValidator'
import GetPingSequenceDetailByIdValidator from 'App/Validators/Ping/GetPingSequenceDetailByIdValidator'
import UpdatePingSequenceDetailValidator from 'App/Validators/Ping/UpdatePingSequenceDetailValidator'
import Config from '@ioc:Adonis/Core/Config'

export default class PingSequenceDetailController {
  public async index({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const page: number = request.input('page', Config.get('app.pagination.page'))
    const limit: number = request.input('limit', Config.get('app.pagination.limit'))
    const pingSequenceDetails = await PingSequenceDetail.query()
      .where({ userId: user.id })
      .paginate(page, limit)

    return pingSequenceDetails.serialize()
  }

  public async show({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingSequenceDetailByIdValidator)
    const pingSequenceDetail = await PingSequenceDetail.query()
      .where({ userId: user.id, id: params.id })
      .firstOrFail()

    return {
      data: {
        pingSequenceDetail: pingSequenceDetail.serialize(),
      },
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { pingSequenceId, day, step, html } = await request.validate(
      CreatePingSequenceDetailValidator
    )
    const pingSequenceDetail = await PingSequenceDetail.create({
      userId: user.id,
      pingSequenceId,
      day,
      step,
      html,
    })

    return {
      data: {
        message: 'Ping sequence detail created successfully',
        pingSequenceDetail: pingSequenceDetail.serialize(),
      },
    }
  }

  public async update({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingSequenceDetailByIdValidator)
    const pingSequenceDetail = await PingSequenceDetail.query()
      .where({
        id: params.id,
        userId: user.id,
      })
      .firstOrFail()

    const { day, step, html } = await request.validate(UpdatePingSequenceDetailValidator)

    await pingSequenceDetail.merge({ day, step, html }).save()
    await pingSequenceDetail.refresh()

    return {
      data: {
        message: 'Ping sequence detail updated successfully',
        pingSequenceDetail: pingSequenceDetail.serialize(),
      },
    }
  }

  public async destroy({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingSequenceDetailByIdValidator)
    const pingSequenceDetail = await PingSequenceDetail.query()
      .where({
        userId: user.id,
        id: params.id,
      })
      .firstOrFail()

    await pingSequenceDetail.delete()

    return {
      data: {
        message: 'Ping sequence detail deleted successfully',
      },
    }
  }

  public async sendPreviewEmail({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingSequenceDetailByIdValidator)

    const pingSequenceDetail = await PingSequenceDetail.query()
      .where({ userId: user.id, id: params.id })
      .firstOrFail()

    await new PingPreviewMail(pingSequenceDetail.id, user.email).sendLater()

    return {
      data: {
        message: 'Test email will be sent to your email',
      },
    }
  }
}
