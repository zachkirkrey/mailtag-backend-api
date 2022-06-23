import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { SignatureEventAttributes } from 'App/Helpers/type'
import Signature from 'App/Models/Signature'
import SignatureEvent from 'App/Models/SignatureEvent'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const signature = await Signature.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const signatureEvents = Array.from(Array(5)).map(() => {
      const signatureEventAttributes: SignatureEventAttributes = {
        signatureId: signature.id,
      }

      return signatureEventAttributes
    })

    await SignatureEvent.createMany(signatureEvents)
  }
}
