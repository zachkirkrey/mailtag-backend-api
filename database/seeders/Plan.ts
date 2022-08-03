import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import { PlanAttributes } from 'App/Helpers/type'
import Plan from 'App/Models/Plan'
import { faker } from '@faker-js/faker'
import Stripe from '@ioc:Adonis/Addons/Stripe'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting plan seeder')

    const prices = await Stripe.prices.list()

    const plans = prices.data.map((price) => {
      const planAttributes: PlanAttributes = {
        name: faker.lorem.word(5), // TODO find the name in prices list response
        price: price.unit_amount! / 100,
        isActive: true,
        isDeleted: false,
        stripePlanId: price.id,
        billing: price.recurring?.interval === 'month' ? 'monthly' : 'yearly',
      }

      return planAttributes
    })

    await Plan.createMany(plans)

    Logger.info('Finishing plan seeder')
  }
}
