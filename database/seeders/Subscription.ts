import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'
import { SubscriptionAttributes } from 'App/Helpers/type'
import Subscription from 'App/Models/Subscription'
import Plan from 'App/Models/Plan'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting subscription seeder')

    const users = await User.query()
    const plans = await Plan.query().limit(2)

    const subscriptions = plans.map((plan, index) => {
      const subscriptionAttributes: SubscriptionAttributes = {
        planId: plan.id,
        userId: users[index].id,
        paymentStatus: faker.helpers.arrayElement(['complete', 'pending', 'canceled']),
        isCanceled: faker.datatype.boolean(),
        isExpired: faker.datatype.boolean(),
        isDeleted: faker.datatype.boolean(),
        expiresAt: DateTime.now(),
      }

      return subscriptionAttributes
    })

    await Subscription.createMany(subscriptions)

    Logger.info('Finishing subscription seeder')
  }
}
