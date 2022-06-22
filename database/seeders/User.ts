import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { faker } from '@faker-js/faker'
import User from 'App/Models/User'
import Account from 'App/Models/Account'
import { UserAttributes } from 'App/Helpers/type'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    const accounts = await Account.query().limit(3)

    const users = accounts.map((account) => {
      const userAttributes: UserAttributes = {
        accountId: account.id,
        providerId: faker.finance.account(21),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email('', '', 'gmail.com'),
        username: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
      }

      return userAttributes
    })

    await User.createMany(users)
  }
}
