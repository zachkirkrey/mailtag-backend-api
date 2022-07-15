import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePingSequenceActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
