import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import PingSequence from 'App/Models/PingSequence'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import PingEmail from 'App/Models/PingEmail'
import { PingEmailAttributes } from 'App/Helpers/type'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting ping email seeder')

    const pingSequence = await PingSequence.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const user = await User.query()
      .where({ providerId: TEST_USER_PROVIDER_ID })
      .preload('emails', (query) => query.limit(1))
      .firstOrFail()

    const pingEmails = Array.from(Array(5)).map(() => {
      const pingEmailAttributes: PingEmailAttributes = {
        recipient: faker.internet.email(),
        name: faker.name.firstName(),
        subject: faker.lorem.words(2),
        status: faker.lorem.words(2),
        isDeleted: faker.datatype.boolean(),
        gmailMessageId: faker.datatype.uuid(),
        gmailThreadId: faker.datatype.uuid(),
        userId: user.id,
        emailId: user.emails[0].id,
        pingSequenceId: pingSequence.id,
      }

      return pingEmailAttributes
    })

    await PingEmail.createMany(pingEmails)

    Logger.info('Finishing ping email seeder')
  }
}
