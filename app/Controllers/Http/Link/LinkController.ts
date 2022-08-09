import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Link from 'App/Models/Link'

export default class LinkController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.user!
    const links = await Link.query().whereHas('email', (query) => query.where({ userId: user.id }))

    return {
      data: {
        links: links.map((link) => link.serializedLinkInfo),
      },
    }
  }

  public async create({ request }: HttpContextContract) {
    // TODO add validator
    const link = await Link.create(request.body())

    return {
      data: {
        message: 'Link created successfully',
        link: link.serializedLinkInfo,
      },
    }
  }

  public async destroy({ params }: HttpContextContract) {
    // TODO add validator
    const link = await Link.query().where({ id: params.id }).firstOrFail()

    await link.delete()

    return {
      data: {
        message: 'Link deleted successfully',
      },
    }
  }
}
