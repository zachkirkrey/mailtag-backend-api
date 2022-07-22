import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTeamInviteValidator {
  constructor(protected ctx: HttpContextContract) {}

  // TODO add fields that can be updated based on chrome extension
  public schema = schema.create({
    email: schema.string([rules.email()]),
  })

  public messages: CustomMessages = {}
}
