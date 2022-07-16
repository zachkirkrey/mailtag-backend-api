import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { PingAttributes } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import Ping from 'App/Models/Ping'
import Logger from '@ioc:Adonis/Core/Logger'
import { faker } from '@faker-js/faker'
import PingSequence from 'App/Models/PingSequence'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting ping seeder')

    const email = await Email.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const pingSequence = await PingSequence.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const pings = Array.from(Array(5)).map(() => {
      const pingAttributes: PingAttributes = {
        emailId: email.id,
        userId: email.userId,
        name: faker.lorem.words(2),
        pingSequenceId: pingSequence.id,
      }

      return pingAttributes
    })

    await Ping.createMany(pings)

    Logger.info('Finishing ping seeder')
  }
}
