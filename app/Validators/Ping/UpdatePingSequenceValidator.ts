import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePingSequenceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    duration: schema.number.optional(),
    timezone: schema.string.optional([rules.timezone()]),
  })

  public messages: CustomMessages = {}
}
