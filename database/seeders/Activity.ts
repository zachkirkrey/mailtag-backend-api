import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { ActivityAttributes } from 'App/Helpers/type'
import Activity from 'App/Models/Activity'
import Email from 'App/Models/Email'
import User from 'App/Models/User'
import Logger from '@ioc:Adonis/Core/Logger'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting activity seeder')

    const user = await User.findByOrFail('provider_id', TEST_USER_PROVIDER_ID)
    const email = await Email.findByOrFail('user_id', user.id)

    const activities = Array.from(Array(5)).map(() => {
      const activityAttributes: ActivityAttributes = {
        title: faker.name.jobTitle(),
        userId: user.id,
        emailId: email.id,
        recipient: faker.internet.email('', '', 'gmail.com'),
        subject: faker.lorem.words(3),
        isDeleted: false,
        status: faker.git.branch(),
        type: faker.lorem.words(1),
      }

      return activityAttributes
    })

    await Activity.createMany(activities)

    Logger.info('Finishing activity seeder')
  }
}
