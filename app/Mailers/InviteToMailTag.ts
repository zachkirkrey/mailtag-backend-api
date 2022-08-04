import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import Logger from '@ioc:Adonis/Core/Logger'

export default class InviteToMailTag extends BaseMailer {
  constructor(private readonly email: User['email'], private readonly username: User['username']) {
    super()
  }

  public override prepare(message: MessageContract) {
    Logger.info(`Sending invitation to email ${this.email} is queued`)
    message
      .subject('MailTag Invitation!')
      .from('info@mailtag.io')
      .to(this.email)
      .htmlView('emails/mailtag_invitation', {
        email: this.email,
        user: { username: this.username },
        url: `https://mailtag.io/register`, //TODO edit url based on client
      })
  }
}
