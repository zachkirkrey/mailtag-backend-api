import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePingSequenceDetailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    pingSequenceId: schema.string([
      rules.uuid(),
      rules.exists({ table: 'ping_sequences', column: 'id' }),
    ]),
    day: schema.number(),
    step: schema.number(),
    html: schema.string(),
  })

  public messages: CustomMessages = {}
}
