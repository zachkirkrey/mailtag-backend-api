import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { ReadEmailAttributes } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import ReadEmail from 'App/Models/ReadEmail'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    const email = await Email.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const readEmails = Array.from(Array(5)).map(() => {
      const readEmailAttributes: ReadEmailAttributes = {
        emailId: email.id,
      }

      return readEmailAttributes
    })

    await ReadEmail.createMany(readEmails)
  }
}
