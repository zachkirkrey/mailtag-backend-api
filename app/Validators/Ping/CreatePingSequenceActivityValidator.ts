import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePingSequenceActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    pingSequenceId: schema.string([
      rules.uuid(),
      rules.exists({ table: 'ping_sequences', column: 'id' }),
    ]),
    status: schema.string(),
  })

  public messages: CustomMessages = {}
}
