import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePingSequenceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    duration: schema.number(),
    timezone: schema.string([rules.timezone()]),
  })

  public messages: CustomMessages = {}
}
