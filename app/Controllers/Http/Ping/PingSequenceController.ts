import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PingSequence from 'App/Models/PingSequence'
import User from 'App/Models/User'
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
    const pingSequence = await PingSequence.findByOrFail('id', params.id)

    return {
      data: {
        pingSequence: pingSequence.serializedPingSequenceInfo,
      },
    }
  }

  public async create({ request }: HttpContextContract) {
    const pingSequence = await PingSequence.create(request.body())

    return {
      data: {
        pingSequence,
      },
    }
  }
}
