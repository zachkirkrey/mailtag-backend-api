import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateSubscriptionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    isCanceled: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
