import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCouponValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    percentage: schema.number.optional([rules.requiredIfNotExists('isRepetitive')]),
    isRepetitive: schema.boolean.optional([rules.requiredIfNotExists('percentage')]),
  })

  public messages: CustomMessages = {}
}
