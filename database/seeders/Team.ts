import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'
import { TeamAttributes } from 'App/Helpers/type'
import { faker } from '@faker-js/faker'
import Team from 'App/Models/Team'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting team seeder')

    const users = await User.all()

    const teams = users.map((user) => {
      const teamAttributes: TeamAttributes = {
        name: faker.lorem.words(1),
        userId: user.id,
        owner: user.email,
        isDeleted: faker.datatype.boolean(),
      }

      return teamAttributes
    })

    await Team.createMany(teams)

    Logger.info('Finishing team seeder')
  }
}
