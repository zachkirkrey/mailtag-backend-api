import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateLinkEventValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    device: schema.string(),
    userAgent: schema.string(),
    ip: schema.string({}, [rules.ip()]),
  })

  public messages: CustomMessages = {}
}
