import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetTeamInviteByIdValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string([
        rules.uuid(),
        rules.exists({
          table: 'team_invites',
          column: 'id',
          where: { is_accepted: false, is_deleted: false },
        }),
      ]),
    }),
  })

  public messages: CustomMessages = {}
}
