import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthException from 'App/Exceptions/AuthException'
import Account from 'App/Models/Account'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'

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
      const { token: accessToken } = await auth.use('api').generate(user, {
        expiresIn: '1min',
      })

      return {
        data: {
          user: { ...user.serializedUserInfo, accessToken },
        },
      }
    }

    // TODO add db transaction to prevent redundant data
    const account = await new Account().save()
    const newUser = new User()
    const refreshToken = jwt.sign(googleUser.id, Env.get('APP_SECRET'))

    // TODO use idempotent method e.g. firstOrCreate
    await newUser
      .merge({
        email: googleUser.email!,
        providerId: googleUser.id,
        accountId: account.id,
        username: googleUser.name,
        firstName: googleUser.original.given_name,
        lastName: googleUser.original.family_name,
        avatarUrl: googleUser.avatarUrl,
        refreshToken: refreshToken,
      })
      .save()

    const { token: accessToken } = await auth.use('api').generate(newUser, {
      expiresIn: '1min',
    })

    return {
      data: {
        user: { ...newUser.serializedUserInfo, accessToken },
      },
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      data: {
        message: 'Bye Bye!',
      },
    }
  }

  public async renewAccess({ request, auth }: HttpContextContract) {
    const { refreshToken } = request.body()

    try {
      const providerId = jwt.verify(refreshToken, Env.get('APP_SECRET'))
      const user = await User.query().where({ providerId }).firstOrFail()
      const { token: accessToken } = await auth.use('api').generate(user, {
        expiresIn: '1min',
      })

      return {
        data: {
          accessToken,
        },
      }
    } catch {
      await auth.use('api').revoke()
      throw new AuthException('Invalid refresh token, please login again!', 422)
    }
  }
}
