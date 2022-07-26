import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthException from 'App/Exceptions/AuthException'
import { verifyRefreshToken } from 'App/Helpers/token'
import User from 'App/Models/User'
import GetRefreshTokenValidator from 'App/Validators/Auth/GetRefreshTokenValidator'
import WelcomeUserMail from 'App/Mailers/WelcomeUserMail'
import FetchOrCreateUser from 'App/Services/User/FetchOrCreateUser'

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

    const service = new FetchOrCreateUser(googleUser)
    const user = await service.call()

    const { token: accessToken } = await auth.use('api').generate(user, {
      expiresIn: '30mins',
    })

    await new WelcomeUserMail(user.id, user.username).sendLater()

    return {
      data: {
        user: { ...user.serializedUserInfo, accessToken },
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
