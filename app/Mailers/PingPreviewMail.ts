import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import PingSequenceDetail from 'App/Models/PingSequenceDetail'
import User from 'App/Models/User'

export default class PingPreviewMail extends BaseMailer {
  constructor(
    private readonly pingSequenceDetailId: PingSequenceDetail['id'],
    private readonly userEmail: User['email']
  ) {
    super()
  }

  private pingSequenceDetail: PingSequenceDetail

  public override async prepare(message: MessageContract) {
    this.pingSequenceDetail = await PingSequenceDetail.query()
      .where('id', this.pingSequenceDetailId)
      .preload('pingSequence')
      .firstOrFail()

    message
      .from('info@mailtag.io') //TODO verify domain identity in SES
      .to(this.userEmail)
      .subject(this.subject)
      .html(this.pingSequenceDetail.html)
  }

  private get subject() {
    const sequenceName = this.pingSequenceDetail.pingSequence.name
    const { pingName } = this.pingSequenceDetail

    return `MailTag Ping Preview | ${sequenceName} | ${pingName}`
  }
}
