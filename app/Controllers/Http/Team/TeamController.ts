import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team'
import User from 'App/Models/User'
import CreateTeamValidator from 'App/Validators/Team/CreateTeamValidator'
import GetTeamByIdValidator from 'App/Validators/Team/GetTeamByIdValidator'
import UpdateTeamValidator from 'App/Validators/Team/UpdateTeamValidator'

export default class TeamController {
  public async show({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const team = await Team.query().where({ userId: user.id }).firstOrFail()

    return {
      data: {
        team: team.serializedTeamInfo,
      },
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { name } = await request.validate(CreateTeamValidator)
    const team = await Team.create({ name, owner: user.email, userId: user.id })

    return {
      data: {
        message: 'Team created successfully',
        team: team.serializedTeamInfo,
      },
    }
  }

  public async update({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { name } = await request.validate(UpdateTeamValidator)
    const team = await Team.query().where({ userId: user.id }).firstOrFail()

    await team.merge({ name }).save()
    await team.refresh()

    return {
      data: {
        message: 'Team updated successfully',
        team: team.serializedTeamInfo,
      },
    }
  }

  public async destroy({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const { params } = await request.validate(GetTeamByIdValidator)
    const team = await Team.query().where({ id: params.id, userId: user.id }).firstOrFail()

    await team.delete()

    return {
      data: {
        message: 'Team deleted successfully',
      },
    }
  }

  public async stats({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const team = await Team.query()
      .where({ userId: user.id })
      .preload('teamMembers')
      .preload('teamInvites')
      .withCount('teamInvites', (query) => {
        query.where({ isAccepted: false }).as('pendingInvites')
      })
      .firstOrFail()

    return {
      data: {
        membersCount: team.teamMembers.length,
        invitesCount: team.teamInvites.length,
        pendingInvitesCount: parseInt(team.$extras.pendingInvites),
      },
    }
  }
}
