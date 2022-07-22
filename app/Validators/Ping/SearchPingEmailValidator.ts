import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SearchPingEmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    searchTerm: schema.string([rules.minLength(1)]),
  })

  public messages: CustomMessages = {}
}
