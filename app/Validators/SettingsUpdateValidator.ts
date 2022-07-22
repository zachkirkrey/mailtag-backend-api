import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SettingsUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    timezone: schema.string.optional([rules.timezone()]),
    language: schema.string.optional(),
    country: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
