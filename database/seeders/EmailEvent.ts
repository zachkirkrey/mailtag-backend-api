import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { EmailEventAttributes } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import EmailEvent from 'App/Models/EmailEvent'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    const email = await Email.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const emailEvents = Array.from(Array(5)).map(() => {
      const emailEventAttributes: EmailEventAttributes = {
        emailId: email.id,
      }

      return emailEventAttributes
    })

    await EmailEvent.createMany(emailEvents)
  }
}
