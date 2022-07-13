import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PingSequence from 'App/Models/PingSequence'
import User from 'App/Models/User'
import CreatePingSequenceValidator from 'App/Validators/CreatePingSequenceValidator'
import GetPingSequenceByIdValidator from 'App/Validators/GetPingSequenceByIdValidator'
export default class PingSequenceController {
  public async index({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const pingSequences = await PingSequence.query().where({ userId: user.id }).preload('pings')

    return {
      data: {
        pingSequences: pingSequences.map((pingSequence) => pingSequence.serializedPingSequenceInfo),
      },
    }
  }

  public async show({ request }: HttpContextContract) {
    const { params } = await request.validate(GetPingSequenceByIdValidator)
    const pingSequence = await PingSequence.query()
      .where('id', params.id)
      .preload('pings')
      .firstOrFail()

    return {
      data: {
        pingSequence: pingSequence.serializedPingSequenceInfo,
      },
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { name, duration, timezone } = await request.validate(CreatePingSequenceValidator)
    const pingSequence = await PingSequence.create({ userId: user.id, name, duration, timezone })

    await pingSequence.load('pings')

    return {
      data: {
        message: 'Ping sequence created successfully',
        pingSequence,
      },
    }
  }
}
