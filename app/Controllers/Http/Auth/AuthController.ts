import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthException from 'App/Exceptions/AuthException'
import { verifyRefreshToken } from 'App/Helpers/token'
import User from 'App/Models/User'
import GetRefreshTokenValidator from 'App/Validators/Auth/GetRefreshTokenValidator'
import FetchOrCreateUser from 'App/Services/User/FetchOrCreateUser'
import Sqs from 'App/Services/AWS/Sqs'
import { SQSMessageTypes } from 'App/Helpers/type'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  public async login({ ally, auth, response }: HttpContextContract) {
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

    const sqs = new Sqs()
    await sqs.sendMessage(SQSMessageTypes.WELCOME_EMAIL, user.id, user.email)

    response.cookie('refresh-token', user.refreshToken, { httpOnly: true })
    response.cookie('access-token', accessToken, { httpOnly: true })

    // const url = Env.get('PRODUCTION_CLIENT_BASE_URL')

    // response.redirect(`${url}/google/success?refresh=${user.refreshToken}&access=${accessToken}`)

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
        expiresIn: '30mins',
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

  // TODO remove after testing
  public async local({ ally, auth, response }: HttpContextContract) {
    const google = ally.use('local')

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

    const sqs = new Sqs()
    await sqs.sendMessage(SQSMessageTypes.WELCOME_EMAIL, user.id, user.email)

    response.cookie('refresh-token', user.refreshToken, { httpOnly: true })
    response.cookie('access-token', accessToken, { httpOnly: true })

    const url = Env.get('LOCAL_CLIENT_BASE_URL')

    response.redirect(`${url}/google/success?refresh=${user.refreshToken}&access=${accessToken}`)

    // return {
    //   data: {
    //     user: { ...user.serializedUserInfo, accessToken },
    //   },
    // }
  }
}
