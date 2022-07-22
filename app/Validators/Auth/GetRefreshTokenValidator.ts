import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetRefreshTokenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    refreshToken: schema.string([rules.exists({ table: 'users', column: 'refresh_token' })]),
  })

  public messages: CustomMessages = {}
}
