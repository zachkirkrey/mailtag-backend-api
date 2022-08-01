import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateSignatureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    isDefault: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
