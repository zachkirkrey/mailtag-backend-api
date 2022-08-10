import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Link from 'App/Models/Link'
import Config from '@ioc:Adonis/Core/Config'

export default class LinkController {
  public async index({ request }: HttpContextContract) {
    const page: number = request.input('page', Config.get('app.pagination.page'))
    const limit: number = request.input('limit', Config.get('app.pagination.limit'))

    const links = await Link.query().paginate(page, limit)

    return links.serialize()
  }
}
