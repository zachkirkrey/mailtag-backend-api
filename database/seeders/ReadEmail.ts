import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { ReadEmailAttributes } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import ReadEmail from 'App/Models/ReadEmail'
import Logger from '@ioc:Adonis/Core/Logger'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting read email seeder')

    const emails = await Email.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .andHas('events')
      .limit(5)

    const readEmails = emails.map((email) => {
      const readEmailAttributes: ReadEmailAttributes = {
        emailId: email.id,
        userId: email.userId,
        device: faker.system.fileType(),
        isDeleted: false,
      }

      return readEmailAttributes
    })

    await ReadEmail.createMany(readEmails)

    Logger.info('Finishing read email seeder')
  }
}
