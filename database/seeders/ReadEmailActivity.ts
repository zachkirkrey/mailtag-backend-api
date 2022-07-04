import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { ReadEmailActivityAttributes, ReadEmailActivityTypes } from 'App/Helpers/type'
import ReadEmail from 'App/Models/ReadEmail'
import ReadEmailActivity from 'App/Models/ReadEmailActivity'
import Logger from '@ioc:Adonis/Core/Logger'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting read email activity seeder')

    const readEmails = await ReadEmail.query()
      .whereHas('email', (query) =>
        query.whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      )
      .limit(5)

    const readEmailActivities = readEmails.map((readEmail) => {
      return Array.from(Array(5)).map(() => {
        const readEmailActivityAttributes: ReadEmailActivityAttributes = {
          readEmailId: readEmail.id,
          type: faker.helpers.arrayElement(ReadEmailActivityTypes),
          device: faker.system.fileType(),
          location: faker.address.cityName(),
          recipient: faker.internet.email(),
        }

        return readEmailActivityAttributes
      })
    })

    for (const readEmailActivity of readEmailActivities) {
      await ReadEmailActivity.createMany(readEmailActivity)
    }

    Logger.info('Finishing read email activity seeder')
  }
}
