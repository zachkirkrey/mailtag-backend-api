import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getIpData } from 'App/Helpers/ip'
import GetIpLocationValidator from 'App/Validators/GetIpLocationValidator'

export default class IpController {
  public async show({ request }: HttpContextContract) {
    const { ip } = await request.validate(GetIpLocationValidator)

    const ipData = await getIpData(ip)

    return {
      data: ipData,
    }
  }
}
