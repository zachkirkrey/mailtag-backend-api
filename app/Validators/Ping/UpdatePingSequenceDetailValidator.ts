import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePingSequenceDetailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    day: schema.number.optional(),
    step: schema.number.optional(),
    html: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
