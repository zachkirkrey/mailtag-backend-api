import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class UpgradePlanMail extends BaseMailer {
  constructor(private email: string, private username: string) {
    super()
  }

  public override prepare(message: MessageContract) {
    message
      .subject('Thank you for upgrading your MailTag plan!')
      .from('info@mailtag.io') //TODO verify domain identity in SES
      .to(this.email)
      .htmlView('emails/team_invitation', {
        user: { email: this.email, fullName: this.username },
        url: `https://mailtag.io`,
      })
  }
}
