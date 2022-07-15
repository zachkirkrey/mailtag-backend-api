import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetEmailByIdValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string([rules.uuid(), rules.exists({ table: 'emails', column: 'id' })]),
    }),
  })

  public messages: CustomMessages = {}
}
