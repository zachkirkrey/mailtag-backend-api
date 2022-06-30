import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { ReadEmailActivityAttributes } from 'App/Helpers/type'
import ReadEmail from 'App/Models/ReadEmail'
import ReadEmailActivity from 'App/Models/ReadEmailActivity'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    const readEmail = await ReadEmail.query()
      .whereHas('email', (query) =>
        query.whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      )
      .firstOrFail()

    const readEmailActivities = Array.from(Array(5)).map(() => {
      const readEmailActivityAttributes: ReadEmailActivityAttributes = {
        readEmailId: readEmail.id,
      }

      return readEmailActivityAttributes
    })

    await ReadEmailActivity.createMany(readEmailActivities)
  }
}
