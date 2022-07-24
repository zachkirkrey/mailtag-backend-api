import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SupportTicketsCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    subject: schema.string([rules.minLength(2)]),
    message: schema.string([rules.minLength(25)]),
  })

  public messages: CustomMessages = {}
}
