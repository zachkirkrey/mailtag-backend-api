import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCouponValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    code: schema.string(),
    percentage: schema.number(),
    isRepetitive: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
