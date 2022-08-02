import Email from 'App/Models/Email'
import SignatureEvent from 'App/Models/SignatureEvent'

type CreateSignatureEventParams = {
  emailId: Email['id']
}

export default class CreateSignatureEvent {
  private readonly emailId: Email['id']

  constructor({ emailId }: CreateSignatureEventParams) {
    this.emailId = emailId
  }

  public async call() {
    const email = await Email.query()
      .where({ id: this.emailId })
      .andWhereNotNull('signature_id')
      .firstOrFail()

    await SignatureEvent.create({
      userId: email.userId,
      emailId: email.id,
      signatureId: email.signatureId!,
      emailSubject: email.subject,
      clickRecipient: email.recipient,
    })
  }
}
