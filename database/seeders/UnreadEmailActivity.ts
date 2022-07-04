import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import UnreadEmail from 'App/Models/UnreadEmail'
import { UnreadEmailActivityAttributes } from 'App/Helpers/type'
import UnreadEmailActivity from 'App/Models/UnreadEmailActivity'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting unread email activity seeder')

    const unreadEmails = await UnreadEmail.query()
      .whereHas('email', (query) =>
        query.whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      )
      .limit(5)

    const unreadEmailActivities = unreadEmails.map((unreadEmail) => {
      return Array.from(Array(5)).map(() => {
        const unreadEmailActivityAttributes: UnreadEmailActivityAttributes = {
          unreadEmailId: unreadEmail.id,
        }

        return unreadEmailActivityAttributes
      })
    })

    for (const unreadEmailActivity of unreadEmailActivities) {
      await UnreadEmailActivity.createMany(unreadEmailActivity)
    }

    Logger.info('Finishing unread email activity seeder')
  }
}
