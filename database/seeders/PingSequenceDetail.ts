import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import { PingSequenceDetailAttributes } from 'App/Helpers/type'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import PingSequence from 'App/Models/PingSequence'
import PingSequenceDetail from 'App/Models/PingSequenceDetail'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting ping sequence detail seeder')

    const pingSequence = await PingSequence.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const pingSequenceDetails = Array.from(Array(5)).map(() => {
      const pingSequenceDetailAttributes: PingSequenceDetailAttributes = {
        userId: pingSequence.userId,
        pingSequenceId: pingSequence.id,
        pingName: faker.word.noun(2),
        day: faker.datatype.number({ max: 10 }),
        step: faker.datatype.number({ max: 15 }),
        html: faker.lorem.paragraphs(2),
        isDeleted: faker.datatype.boolean(),
      }

      return pingSequenceDetailAttributes
    })

    await PingSequenceDetail.createMany(pingSequenceDetails)

    Logger.info('Finishing ping sequence detail seeder')
  }
}
