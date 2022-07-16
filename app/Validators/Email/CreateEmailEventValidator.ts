import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEmailEventValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    emailId: schema.string([rules.uuid(), rules.exists({ table: 'emails', column: 'id' })]),
    device: schema.string(),
    userAgent: schema.string(),
    location: schema.string(),
  })

  public messages: CustomMessages = {}
}
