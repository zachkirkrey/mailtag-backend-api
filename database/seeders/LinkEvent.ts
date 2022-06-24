import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { LinkEventAttributes } from 'App/Helpers/type'
import Link from 'App/Models/Link'
import LinkEvent from 'App/Models/LinkEvent'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    const link = await Link.query()
      .whereHas('email', (query) =>
        query.whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      )
      .firstOrFail()

    const linkEvents = Array.from(Array(5)).map(() => {
      const linkEventAttributes: LinkEventAttributes = {
        linkId: link.id,
      }

      return linkEventAttributes
    })

    await LinkEvent.createMany(linkEvents)
  }
}
