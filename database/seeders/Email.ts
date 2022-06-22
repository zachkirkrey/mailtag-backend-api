import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { EmailAttributes } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    const user = await User.query().where({ providerId: TEST_USER_PROVIDER_ID }).firstOrFail()

    const emails = Array.from(Array(5)).map(() => {
      const emailAttributes: EmailAttributes = {
        userId: user.id,
        recipient: faker.internet.email('', '', 'gmail.com'),
        subject: faker.lorem.words(3),
        gmailMessageId: faker.random.alphaNumeric(16),
        gmailThreadId: faker.random.alphaNumeric(16),
        isDeleted: false,
      }

      return emailAttributes
    })

    await Email.createMany(emails)
  }
}
