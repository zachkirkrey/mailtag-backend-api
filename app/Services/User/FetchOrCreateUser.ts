import Database, { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import { AllyUserContract, GoogleToken } from '@ioc:Adonis/Addons/Ally'
import User from 'App/Models/User'
import Account from 'App/Models/Account'
import { generateRefreshToken } from 'App/Helpers/token'
import { defaultPingSequenceAttributes } from 'App/Helpers/ping-sequences'

type GoogleUser = AllyUserContract<GoogleToken>

export default class FetchOrCreateUser {
  constructor(private readonly googleUser: GoogleUser) {}

  public async call() {
    let user = await this.findUser()

    if (!user) {
      user = await this.createNewUser()
    }

    return user
  }

  private async findUser() {
    return await User.findBy('provider_id', this.googleUser.id)
  }

  private async createNewUser() {
    const user = await Database.transaction(async (trx) => {
      const account = await Account.create({}, { client: trx })

      const user = new User()
      await user
        .useTransaction(trx)
        .merge({
          ...this.googleUserAttributes,
          accountId: account.id,
          refreshToken: generateRefreshToken(user.id, this.googleUser.id),
        })
        .save()

      await Promise.all([
        user.related('settings').create({}, { client: trx }),
        this.createDefaultPingSequences(user, trx),
      ])

      return user
    })

    return user
  }

  private get googleUserAttributes() {
    return {
      email: this.googleUser.email!,
      providerId: this.googleUser.id,
      username: this.googleUser.name,
      firstName: this.googleUser.original.given_name,
      lastName: this.googleUser.original.family_name,
      avatarUrl: this.googleUser.avatarUrl,
    }
  }

  private async createDefaultPingSequences(user: User, trx: TransactionClientContract) {
    for (const { detailsAttrs, ...pingSequenceAttrs } of defaultPingSequenceAttributes) {
      const pingSequence = await user
        .related('pingSequences')
        .create(pingSequenceAttrs, { client: trx })

      await pingSequence.related('pingSequenceDetails').createMany(
        detailsAttrs.map((detailAttrs) => ({ ...detailAttrs, userId: user.id })),
        { client: trx }
      )
    }
  }
}
