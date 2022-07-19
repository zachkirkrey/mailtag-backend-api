import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sku from 'App/Models/Sku'
import Team from 'App/Models/Team'
import TeamMember from 'App/Models/TeamMember'
import User from 'App/Models/User'
import CreateTeamMemberValidator from 'App/Validators/Team/Member/CreateTeamMemberValidator'
import GetTeamMemberByIdValidator from 'App/Validators/Team/Member/GetTeamMemberByIdValidator'
import UpdateTeamMemberValidator from 'App/Validators/Team/Member/UpdateTeamMemberValidator'
import { randomUUID } from 'crypto'

export default class TeamMemberController {
  public async index({ auth }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const team = await Team.query().where({ userId: user.id }).preload('teamMembers').firstOrFail()

    return {
      data: {
        teamMembers: team.teamMembers.map((teamMember) => teamMember.serializedTeamMemberInfo),
      },
    }
  }

  public async show({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const team = await Team.query().where({ userId: user.id }).firstOrFail()
    const { params } = await request.validate(GetTeamMemberByIdValidator)
    const teamMember = await TeamMember.query()
      .where({ id: params.id, teamId: team.id })
      .firstOrFail()

    return {
      data: {
        teamMember: teamMember.serializedTeamMemberInfo,
      },
    }
  }

  public async create({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const team = await Team.query().where({ userId: user.id }).firstOrFail()
    const { email } = await request.validate(CreateTeamMemberValidator)
    // TODO wrap transaction
    const teamMember = await TeamMember.create({ email, teamId: team.id })

    await team.load('teamMembers')

    if (team.teamMembers.length >= 5 && !team.skuId) {
      const skuCode = randomUUID().split('-')
      const sku = await Sku.firstOrCreate(
        { teamId: team.id },
        { code: `${skuCode[0]}-${skuCode[1]}`, teamId: team.id }
      )
      await team.merge({ skuId: sku.id }).save()
    }

    return {
      data: {
        message: 'Team member created successfully',
        teamMember: teamMember.serializedTeamMemberInfo,
      },
    }
  }

  // TODO set this methods to SetAdmin instead if no update fields exist on member
  public async update({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const team = await Team.query().where({ userId: user.id }).firstOrFail()
    const { params } = await request.validate(GetTeamMemberByIdValidator)
    const teamMember = await TeamMember.query()
      .where({ id: params.id, teamId: team.id })
      .firstOrFail()
    const { isAdmin } = await request.validate(UpdateTeamMemberValidator)

    await teamMember.merge({ isAdmin }).save()
    await teamMember.refresh()

    return {
      data: {
        message: 'Team member updated successfully',
        teamMember: teamMember.serializedTeamMemberInfo,
      },
    }
  }

  public async destroy({ auth, request }: HttpContextContract) {
    const user: User = auth.use('api').user!
    const team = await Team.query().where({ userId: user.id }).firstOrFail()
    const { params } = await request.validate(GetTeamMemberByIdValidator)
    const teamMember = await TeamMember.query()
      .where({ id: params.id, teamId: team.id })
      .firstOrFail()

    await teamMember.delete()

    return {
      data: {
        message: 'Team member deleted successfully',
      },
    }
  }
}
