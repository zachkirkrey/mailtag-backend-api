import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { SignatureEventAttributes } from 'App/Helpers/type'
import SignatureEvent from 'App/Models/SignatureEvent'
import Logger from '@ioc:Adonis/Core/Logger'
import Email from 'App/Models/Email'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting signature event seeder')

    const email = await Email.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .andWhereNotNull('signature_id')
      .firstOrFail()

    const signatureEvents = Array.from(Array(5)).map(() => {
      const signatureEventAttributes: SignatureEventAttributes = {
        userId: email.userId,
        emailId: email.id,
        signatureId: email.signatureId!,
        emailSubject: email.subject,
        clickRecipient: [],
        isDeleted: false,
      }

      return signatureEventAttributes
    })

    await SignatureEvent.createMany(signatureEvents)

    Logger.info('Finishing signature event seeder')
  }
}
