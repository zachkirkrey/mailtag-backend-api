import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ping from 'App/Models/Ping'
import User from 'App/Models/User'
import GetPingByIdValidator from 'App/Validators/Ping/GetPingByIdValidator'
import Config from '@ioc:Adonis/Core/Config'

export default class PingController {
  public async index({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const page: number = request.input('page', Config.get('app.pagination.page'))
    const limit: number = request.input('limit', Config.get('app.pagination.limit'))
    const pings = await Ping.query().where({ userId: user.id }).paginate(page, limit)
    return pings.serialize()
  }

  public async show({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetPingByIdValidator)
    const ping = await Ping.query().where({ id: params.id, userId: user.id }).firstOrFail()

    return {
      data: {
        ping: ping.serialize(),
      },
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { name, emailId } = request.body()
    const ping = await Ping.create({ name, emailId, userId: user.id })

    return {
      data: {
        message: 'Ping created successfully',
        ping: ping.serialize(),
      },
    }
  }

  public async destroy({ request }: HttpContextContract) {
    const { params } = await request.validate(GetPingByIdValidator)
    const ping = await Ping.findByOrFail('id', params.id)

    await ping.delete()

    return {
      data: {
        message: 'Ping deleted successfully',
      },
    }
  }
}
