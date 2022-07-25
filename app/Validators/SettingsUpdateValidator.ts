import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SettingsUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    timezone: schema.string.optional([rules.timezone()]),
    language: schema.string.optional(),
    country: schema.string.optional(),

    mailtagDefaultEnabled: schema.boolean.optional(),
    desktopNotifications: schema.boolean.optional(),
    emailNotifications: schema.boolean.optional(),
    linkTracking: schema.boolean.optional(),
    attachmentTracking: schema.boolean.optional(),
    customSignatures: schema.boolean.optional(),
    customSignatureForPings: schema.boolean.optional(),
    bcc: schema.string.nullableAndOptional({}, [rules.email()]),
    subDomain: schema.string.nullableAndOptional({}, [rules.url()]),
    boomerang: schema.string.nullableAndOptional({}, [rules.minLength(1)]),
  })

  public messages: CustomMessages = {}
}
