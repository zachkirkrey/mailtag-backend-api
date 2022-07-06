import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import Email from 'App/Models/Email'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { UnreadEmailAttributes } from 'App/Helpers/type'
import UnreadEmail from 'App/Models/UnreadEmail'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting unread email seeder')

    const emails = await Email.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .andDoesntHave('events')
      .limit(5)

    const unreadEmails = emails.map((email) => {
      const unreadEmailAttributes: UnreadEmailAttributes = {
        emailId: email.id,
        userId: email.userId,
        device: faker.system.fileType(),
      }

      return unreadEmailAttributes
    })

    await UnreadEmail.createMany(unreadEmails)

    Logger.info('Finishing unread email seeder')
  }
}
