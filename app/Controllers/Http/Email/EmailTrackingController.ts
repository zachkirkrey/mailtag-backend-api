import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Email from 'App/Models/Email'
import User from 'App/Models/User'
import Config from '@ioc:Adonis/Core/Config'

export default class EmailTrackingPixelController {
  public async index({ auth }: HttpContextContract) {
    const trackingPixels: Array<string> = []
    const user: User = auth.use('api').user!

    const emails = await Email.query().where({ userId: user.id })
    emails.forEach((email) => {
      const url: string = `${Config.get('app.productionClientBaseUrl')}/email-event/${email.id}.png`
      trackingPixels.push(url)
    })

    return {
      data: trackingPixels,
    }
  }
}
