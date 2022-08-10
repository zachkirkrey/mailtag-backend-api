import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { EmailEventAttributes } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import EmailEvent from 'App/Models/EmailEvent'
import Logger from '@ioc:Adonis/Core/Logger'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting email event seeder')

    const email = await Email.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const emailEvents = Array.from(Array(5)).map(() => {
      const emailEventAttributes: EmailEventAttributes = {
        emailId: email.id,
        device: faker.system.fileType(),
        userAgent: faker.internet.userAgent(),
        location: faker.address.streetAddress(),
        emailReadTime: DateTime.now(),
        isDeleted: false,
        readRecipient: faker.internet.email(),
        emailClickedDeviceName: faker.internet.domainSuffix(),
      }

      return emailEventAttributes
    })

    await EmailEvent.createMany(emailEvents)

    Logger.info('Finishing email event seeder')
  }
}
