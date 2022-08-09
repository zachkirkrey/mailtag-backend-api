import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getIpData } from 'App/Helpers/ip'
import EmailEvent from 'App/Models/EmailEvent'
import CreateEmailEventValidator from 'App/Validators/Email/CreateEmailEventValidator'
import GetEmailEventByIdValidator from 'App/Validators/Email/GetEmailEventByIdValidator'

export default class EmailEventController {
  public async show({ request }: HttpContextContract) {
    const { params } = await request.validate(GetEmailEventByIdValidator)
    const emailEvent = await EmailEvent.query().where({ id: params.id }).firstOrFail()

    return {
      data: {
        emailEvent,
      },
    }
  }

  public async create({ request, params }: HttpContextContract) {
    const { device, userAgent, ip } = await request.validate(CreateEmailEventValidator)

    // TODO: Move to background job, should be called after the event created
    const ipData = await getIpData(ip)
    const location = `${ipData.city} / ${ipData.country}`

    const emailEvent = await EmailEvent.create({
      emailId: params.emailId,
      device,
      userAgent,
      location,
    })

    return {
      data: {
        message: 'Email event created successfully',
        emailEvent: emailEvent.serializedEmailEventInfo,
      },
    }
  }

  public async destroy({ request }: HttpContextContract) {
    const { params } = await request.validate(GetEmailEventByIdValidator)
    const emailEvent = await EmailEvent.query().where({ id: params.id }).firstOrFail()

    await emailEvent.delete()

    return {
      data: {
        message: 'Email event deleted successfully',
      },
    }
  }

  public async track({ params, request }: HttpContextContract) {
    const { ip, device, agent } = request.all()
    const ipData = await getIpData(ip)
    const location = `${ipData.city} / ${ipData.country}`

    await EmailEvent.create({
      emailId: params.emailId,
      device,
      userAgent: agent,
      location,
    })

    const trackImg = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    )

    return trackImg
  }
}
