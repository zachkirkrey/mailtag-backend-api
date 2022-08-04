import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InviteEmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    emails: schema.array([rules.minLength(1)]).members(schema.string([rules.email()])),
  })

  public messages: CustomMessages = {}
}
