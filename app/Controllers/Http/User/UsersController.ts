import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async show({ params }: HttpContextContract) {
    // TODO add validator
    const user = await User.findByOrFail('id', params.id)

    return {
      data: {
        user,
      },
    }
  }

  public async update({ params, request }: HttpContextContract) {
    // TODO add validator
    const user = await User.findByOrFail('id', params.id)
    // TODO add body validator
    await user.merge(request.body()).save()

    return {
      data: {
        user,
      },
    }
  }
}
