import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { ReadEmailAttributes } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import ReadEmail from 'App/Models/ReadEmail'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    // TODO should be query.all.limit(5)
    const email = await Email.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    // FIXME create only one read email to each unique email then we have multiple activities for each read email
    const readEmails = Array.from(Array(5)).map(() => {
      const readEmailAttributes: ReadEmailAttributes = {
        emailId: email.id,
        device: faker.system.fileType(),
      }

      return readEmailAttributes
    })

    await ReadEmail.createMany(readEmails)
  }
}
