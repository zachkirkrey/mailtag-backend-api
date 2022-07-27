import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePaymentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    planId: schema.string([
      rules.uuid(),
      rules.exists({ table: 'plans', column: 'id', where: { is_active: true, is_deleted: false } }),
    ]),
  })

  public messages: CustomMessages = {}
}
