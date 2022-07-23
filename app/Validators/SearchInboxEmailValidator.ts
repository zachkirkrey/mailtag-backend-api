import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SearchInboxEmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    searchTerm: schema.string([rules.minLength(1)]),
    only: schema.enum(['reads', 'unreads'] as const),
  })

  public messages: CustomMessages = {}
}
