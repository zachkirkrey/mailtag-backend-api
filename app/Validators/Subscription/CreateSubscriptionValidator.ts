import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateSubscriptionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    planId: schema.string([rules.uuid(), rules.exists({ table: 'plans', column: 'id' })]),
    paymentStatus: schema.enum(['complete', 'pending', 'canceled'] as const),
  })

  public messages: CustomMessages = {}
}
