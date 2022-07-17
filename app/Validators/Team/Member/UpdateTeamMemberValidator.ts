import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTeamMemberValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    isAdmin: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
