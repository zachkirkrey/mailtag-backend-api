import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Logger from '@ioc:Adonis/Core/Logger'
import User from 'App/Models/User'
import { TeamInviteAttributes } from 'App/Helpers/type'
import Team from 'App/Models/Team'
import { TEST_USER_EMAIL } from 'App/Helpers/constant'
import { faker } from '@faker-js/faker'
import TeamInvite from 'App/Models/TeamInvite'

export default class extends BaseSeeder {
  public override async run() {
    // Write your database queries inside the run method
    Logger.info('Starting team invite seeder')

    const users = await User.query().orDoesntHave('team').limit(5)
    const team = await Team.query().where({ owner: TEST_USER_EMAIL }).firstOrFail()

    const teamInvites = users.map((user) => {
      const teamInviteAttributes: TeamInviteAttributes = {
        email: user.email,
        teamId: team.id,
        isDeleted: faker.datatype.boolean(),
      }

      return teamInviteAttributes
    })

    await TeamInvite.createMany(teamInvites)

    Logger.info('Finishing team invite seeder')
  }
}
