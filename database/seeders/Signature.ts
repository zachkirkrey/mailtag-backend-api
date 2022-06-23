import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import { BorderRadiusTypes, SignatureAttributes } from 'App/Helpers/type'
import Signature from 'App/Models/Signature'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    const user = await User.query().where({ providerId: TEST_USER_PROVIDER_ID }).firstOrFail()

    const signatures = Array.from(Array(5)).map(() => {
      const signatureAttributes: SignatureAttributes = {
        userId: user.id,
        name: faker.random.word(),
        title: faker.name.jobTitle(),
        avatarUrl: faker.internet.avatar(),
        avatarBorderRadiusType: faker.helpers.arrayElement(Object.values(BorderRadiusTypes)),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        officeAddress: faker.address.streetAddress(),
        officePhoneNumber: faker.phone.number('501-###-###'),
        homePhoneNumber: faker.phone.number('501-###-###'),
        calendarUrl: faker.internet.url(),
        bannerUrl: faker.image.imageUrl(),
        isBannerEnabled: faker.datatype.boolean(),
        isDeleted: false,
        isDefault: faker.datatype.boolean(),
      }

      return signatureAttributes
    })

    await Signature.createMany(signatures)
  }
}
