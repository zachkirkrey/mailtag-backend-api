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
    const plans = await Plan.query()

    const subscriptions = users.map((user) => {
      const subscriptionAttributes: SubscriptionAttributes = {
        planId: faker.helpers.arrayElement(plans).id,
        userId: user.id,
        paymentStatus: faker.helpers.arrayElement(['paid', 'unpaid', 'no_payment_required']),
        isCanceled: false,
        isExpired: false,
        isDeleted: false,
        expiresAt: DateTime.now(),
        stripeSubscriptionId: faker.helpers.arrayElement(plans).stripePlanId,
        stripeCustomerId: faker.random.numeric(5),
        billing: faker.helpers.arrayElement(plans).billing,
      }

      return subscriptionAttributes
    })

    await Subscription.createMany(subscriptions)

    Logger.info('Finishing subscription seeder')
  }
}
