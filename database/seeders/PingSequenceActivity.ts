import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import PingSequence from 'App/Models/PingSequence'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { PingSequenceActivityAttributes } from 'App/Helpers/type'
import PingSequenceActivity from 'App/Models/PingSequenceActivity'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting ping sequence activity seeder')

    const pingSequence = await PingSequence.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const pingSequenceActivities = Array.from(Array(5)).map(() => {
      const pingSequenceActivityAttributes: PingSequenceActivityAttributes = {
        userId: pingSequence.userId,
        pingSequenceId: pingSequence.id,
        isDeleted: faker.datatype.boolean(),
        status: faker.lorem.words(1),
      }

      return pingSequenceActivityAttributes
    })

    await PingSequenceActivity.createMany(pingSequenceActivities)

    Logger.info('Finishing ping sequence activity seeder')
  }
}
