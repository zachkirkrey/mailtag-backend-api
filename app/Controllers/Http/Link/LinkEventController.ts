import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getIpData } from 'App/Helpers/ip'
import LinkEvent from 'App/Models/LinkEvent'
import CreateLinkEventValidator from 'App/Validators/CreateLinkEventValidator'

export default class LinkEventController {
  public async index({ params }: HttpContextContract) {
    const linkEvents = await LinkEvent.query().where({ linkId: params.linkId })

    return {
      data: {
        linkEvents: linkEvents.map((linkEvent) => linkEvent.serializedLinkEventInfo),
      },
    }
  }

  public async create({ request }: HttpContextContract) {
    const { device, userAgent, ip } = await request.validate(CreateLinkEventValidator)
    const { id } = request.all()
    const ipData = await getIpData(ip)
    const location = `${ipData.city} / ${ipData.country}`

    const linkEvent = await LinkEvent.create({ linkId: id, device, userAgent, location })

    return {
      data: {
        message: 'Link event created successfully',
        linkEvent: linkEvent.serializedLinkEventInfo,
      },
    }
  }
}
