import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCouponValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    percentage: schema.number.optional(),
    isRepetitive: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
