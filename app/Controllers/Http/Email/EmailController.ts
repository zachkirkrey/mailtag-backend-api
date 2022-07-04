import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Email from 'App/Models/Email'
import User from 'App/Models/User'

export default class EmailController {
  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    // TODO add validator
    const payload = request.body()

    const email = await Email.create(payload)

    return {
      data: {
        message: 'Email created successfully',
        email,
        user,
      },
    }
  }
}
