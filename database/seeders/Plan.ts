import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import { PlanAttributes } from 'App/Helpers/type'
import Plan from 'App/Models/Plan'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting plan seeder')

    const plans = Array.from(Array(10)).map(() => {
      const planAttributes: PlanAttributes = {
        name: faker.lorem.word(5),
        price: faker.datatype.number({ min: 1, max: 100 }),
        isActive: faker.datatype.boolean(),
        isDeleted: faker.datatype.boolean(),
      }

      return planAttributes
    })

    await Plan.createMany(plans)

    Logger.info('Finishing plan seeder')
  }
}
