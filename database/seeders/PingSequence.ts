import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import { PingSequenceAttributes } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import PingSequence from 'App/Models/PingSequence'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting ping sequence seeder')

    const email = await Email.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const pingSequences = Array.from(Array(5)).map(() => {
      const pingSequenceAttributes: PingSequenceAttributes = {
        userId: email.userId,
        name: faker.lorem.words(2),
        isDeleted: faker.datatype.boolean(),
        timezone: faker.address.timeZone(),
      }

      return pingSequenceAttributes
    })

    await PingSequence.createMany(pingSequences)

    Logger.info('Finishing ping sequence seeder')
  }
}
