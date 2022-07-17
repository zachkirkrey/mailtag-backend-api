import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'
import { TEST_USER_EMAIL, TEST_USER_PROVIDER_ID } from 'App/Helpers/constant'
import Team from 'App/Models/Team'
import { TeamMemberAttributes } from 'App/Helpers/type'
import TeamMember from 'App/Models/TeamMember'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting team member seeder')

    const users = await User.query().whereNot({ providerId: TEST_USER_PROVIDER_ID }).limit(5)
    const team = await Team.query().where({ owner: TEST_USER_EMAIL }).firstOrFail()

    const teamMembers = users.map((user) => {
      const teamMemberAttributes: TeamMemberAttributes = {
        email: user.email,
        teamId: team.id,
        isAdmin: false,
        isDeleted: faker.datatype.boolean(),
        status: faker.lorem.words(1),
      }

      return teamMemberAttributes
    })

    await TeamMember.createMany(teamMembers)

    Logger.info('Finishing team member seeder')
  }
}
