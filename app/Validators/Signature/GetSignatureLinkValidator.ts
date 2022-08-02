import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'

export default class GetSignatureLinkValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    emailId: schema.string([rules.uuid(), rules.exists({ table: 'emails', column: 'id' })]),
    linkUrl: schema.string([rules.url()]),
  })

  public messages: CustomMessages = {
    '*': () => {
      throw new Exception("Link is broken, we're investigating the issue", 500)
    },
  }
}
