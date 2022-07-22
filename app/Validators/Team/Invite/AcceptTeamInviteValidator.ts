import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AcceptTeamInviteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([rules.email(), rules.exists({ table: 'team_invites', column: 'email' })]),
    teamId: schema.string([rules.uuid(), rules.exists({ table: 'teams', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
