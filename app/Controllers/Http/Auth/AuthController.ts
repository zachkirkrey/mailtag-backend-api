import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthException from 'App/Exceptions/AuthException'
import Account from 'App/Models/Account'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ ally, auth }: HttpContextContract) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      // TODO create standard custom error codes sheet
      throw new AuthException('Access Denied', 403)
    }

    if (google.stateMisMatch()) {
      throw new AuthException('Request expired. Retry again', 422)
    }

    const googleUser = await google.user()
    const user = await User.findBy('provider_id', googleUser.id)

    if (user) {
      const { token } = await auth.use('api').generate(user)

      return {
        data: {
          user,
          token,
        },
      }
    }

    const account = new Account()

    // TODO add db transaction to prevent redundant data
    const [, newUser] = await Promise.all([
      account.save(),
      // TODO use idempotent method e.g. firstOrCreate
      User.create({
        email: googleUser.email!,
        providerId: googleUser.id,
        accountId: account.id,
        username: googleUser.name,
        firstName: googleUser.original.given_name,
        lastName: googleUser.original.family_name,
        avatarUrl: googleUser.avatarUrl,
      }),
    ])

    const { token } = await auth.use('api').generate(newUser)

    return {
      data: {
        user: newUser,
        token,
      },
    }
  }
}
