import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthException from 'App/Exceptions/AuthException'
import { generateRefreshToken, verifyRefreshToken } from 'App/Helpers/token'
import Account from 'App/Models/Account'
import User from 'App/Models/User'
import GetRefreshTokenValidator from 'App/Validators/Auth/GetRefreshTokenValidator'
import Database from '@ioc:Adonis/Lucid/Database'

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
        expiresIn: '30mins',
      })

      return {
        data: {
          user: { ...user.serializedUserInfo, accessToken },
        },
      }
    }

    const newUser = await Database.transaction(async (trx) => {
      const account = await Account.create({}, { client: trx })
      // TODO use idempotent method e.g. firstOrCreate
      const newUser = new User().useTransaction(trx)

      await newUser
        .useTransaction(trx)
        .merge({
          email: googleUser.email!,
          providerId: googleUser.id,
          accountId: account.id,
          username: googleUser.name,
          firstName: googleUser.original.given_name,
          lastName: googleUser.original.family_name,
          avatarUrl: googleUser.avatarUrl,
          refreshToken: generateRefreshToken(newUser.id, googleUser.id),
        })
        .save()

      await newUser.related('settings').create({}, { client: trx })

      return newUser
    })

    const { token: accessToken } = await auth.use('api').generate(newUser, {
      expiresIn: '30mins',
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
    const { refreshToken } = await request.validate(GetRefreshTokenValidator)

    try {
      const providerId = verifyRefreshToken(refreshToken)
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
