import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { faker } from '@faker-js/faker'
import User from 'App/Models/User'
import Account from 'App/Models/Account'
import { UserAttributes } from 'App/Helpers/type'
import { TEST_USER_EMAIL, TEST_USER_PROVIDER_ID, TEST_USER_USERNAME } from 'App/Helpers/constant'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    const accounts = await Account.query().limit(2)

    const randomUsers = accounts.map((account) => {
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

    await User.createMany(randomUsers)

    const account = await Account.query().doesntHave('user').firstOrFail()

    const testUser: UserAttributes = {
      accountId: account.id,
      providerId: TEST_USER_PROVIDER_ID,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: TEST_USER_EMAIL,
      username: TEST_USER_USERNAME,
      avatarUrl: faker.internet.avatar(),
    }

    await User.createMany([testUser])
  }
}