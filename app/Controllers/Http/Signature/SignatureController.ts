import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Signature from 'App/Models/Signature'
import User from 'App/Models/User'
import GetSignatureByIdValidator from 'App/Validators/GetSignatureByIdValidator'

export default class SignatureController {
  public async index({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const signatures = await Signature.query().where({ userId: user.id })

    return {
      data: {
        signatures: signatures.map((signature) => signature.serializedSignatureBasicInfo),
      },
    }
  }

  public async show({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetSignatureByIdValidator)

    const signature = await Signature.query()
      .where({ id: params.id, userId: user.id })
      .preload('user')
      .firstOrFail()

    return {
      data: {
        signature: signature.serializedSignatureInfo,
      },
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!

    const {
      name,
      title,
      avatarUrl,
      company,
      email,
      avatarBorderRadiusType,
      website,
      officeAddress,
      officePhoneNumber,
      homePhoneNumber,
      bannerUrl,
    } = request.body()

    const signature = await Signature.create({
      userId: user.id,
      name,
      title,
      avatarUrl,
      company,
      email,
      avatarBorderRadiusType,
      website,
      officeAddress,
      officePhoneNumber,
      homePhoneNumber,
      bannerUrl,
    })

    return {
      data: {
        message: 'Signature created successfully',
        signature: signature.serializedSignatureBasicInfo,
      },
    }
  }

  public async destroy({ request }: HttpContextContract) {
    const { params } = await request.validate(GetSignatureByIdValidator)
    const signature = await Signature.findByOrFail('id', params.id)

    await signature.delete()

    return {
      data: {
        message: 'Signature deleted successfully',
      },
    }
  }
}
