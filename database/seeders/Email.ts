import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { EmailAttributes } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import { faker } from '@faker-js/faker'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import Logger from '@ioc:Adonis/Core/Logger'
import Signature from 'App/Models/Signature'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting email seeder')

    const signature = await Signature.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const emails = Array.from(Array(5)).map(() => {
      const emailAttributes: EmailAttributes = {
        userId: signature.userId,
        signatureId: signature.id,
        name: faker.random.alphaNumeric(16),
        destinationEmail: faker.internet.email('', '', 'gmail.com'),
        recipient: [
          {
            name: faker.random.alphaNumeric(16),
            emailAddress: faker.internet.email('', '', 'gmail.com'),
          },
        ],
        ccRecipient: [
          {
            name: faker.random.alphaNumeric(16),
            emailAddress: faker.internet.email('', '', 'gmail.com'),
          },
        ],
        bccRecipient: [
          {
            name: faker.random.alphaNumeric(16),
            emailAddress: faker.internet.email('', '', 'gmail.com'),
          },
        ],
        subject: faker.lorem.words(3),
        timeZone: 'UTC',
        emailBody: faker.random.alphaNumeric(16),
        gmailMessageId: faker.random.alphaNumeric(16),
        gmailThreadId: faker.random.alphaNumeric(16),
        isDeleted: false,
      }

      return emailAttributes
    })

    await Email.createMany(emails)

    Logger.info('Finishing email seeder')
  }
}
