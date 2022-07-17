import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePingEmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    recipient: schema.string(),
    name: schema.string(),
    subject: schema.string(),
    status: schema.string(),
    gmailMessageId: schema.string(),
    gmailThreadId: schema.string(),
    emailId: schema.string([rules.uuid(), rules.exists({ table: 'emails', column: 'id' })]),
    pingSequenceId: schema.string([
      rules.uuid(),
      rules.exists({ table: 'ping_sequences', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {}
}
