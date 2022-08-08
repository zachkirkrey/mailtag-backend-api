import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetIpLocationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ip: schema.string({}, [rules.ip()]),
  })

  public messages: CustomMessages = {}
}
