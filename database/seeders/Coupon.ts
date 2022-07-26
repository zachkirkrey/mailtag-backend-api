import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'
import { CouponAttributes } from 'App/Helpers/type'
import Coupon from 'App/Models/Coupon'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting coupon seeder')

    const users = await User.query()

    const coupons = users.map((user) => {
      const couponAttributes: CouponAttributes = {
        code: faker.random.alphaNumeric(5),
        percentage: faker.datatype.number({ min: 1, max: 100 }),
        userId: user.id,
        isRepetitive: faker.datatype.boolean(),
        isUsed: faker.datatype.boolean(),
        isDeleted: false,
        usedAt: DateTime.now(),
      }

      return couponAttributes
    })

    await Coupon.createMany(coupons)

    Logger.info('Finishing coupon seeder')
  }
}
