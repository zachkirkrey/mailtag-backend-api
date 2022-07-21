import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { faker } from '@faker-js/faker'
import User from 'App/Models/User'
import Account from 'App/Models/Account'
import { UserAttributes } from 'App/Helpers/type'
import { TEST_USER_EMAIL, TEST_USER_PROVIDER_ID, TEST_USER_USERNAME } from 'App/Helpers/constant'
import Logger from '@ioc:Adonis/Core/Logger'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting user seeder')

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
        refreshToken: faker.random.alphaNumeric(10),
      }

      return userAttributes
    })

    await User.createMany(randomUsers)

    const account = await Account.query().andDoesntHave('user').firstOrFail()

    const testUser: UserAttributes = {
      accountId: account.id,
      providerId: TEST_USER_PROVIDER_ID,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: TEST_USER_EMAIL,
      username: TEST_USER_USERNAME,
      avatarUrl: faker.internet.avatar(),
      refreshToken: faker.random.alphaNumeric(10),
    }

    await User.createMany([testUser])

    Logger.info('Finishing user seeder')
  }
}
