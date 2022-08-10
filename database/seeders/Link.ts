import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { LinkAttributes } from 'App/Helpers/type'
import Email from 'App/Models/Email'
import { faker } from '@faker-js/faker'
import Link from 'App/Models/Link'
import Logger from '@ioc:Adonis/Core/Logger'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting link seeder')

    const email = await Email.query()
      .whereHas('user', (query) => query.where({ providerId: TEST_USER_PROVIDER_ID }))
      .firstOrFail()

    const links = Array.from(Array(5)).map(() => {
      const linkAttributes: LinkAttributes = {
        emailId: email.id,
        link: faker.internet.url(),
        trackingUrl: faker.internet.url(),
        date: '2022-11-14T22:46:12.257+00:00',
        time: '2022-11-14T22:46:12.257+00:00',
        isDeleted: false,
      }

      return linkAttributes
    })

    await Link.createMany(links)

    Logger.info('Finishing link seeder')
  }
}
