import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FileUploadValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      size: '5mb',
      extnames: ['pdf', 'jpg', 'png', 'doc', 'xls'],
    }),
  })

  public messages: CustomMessages = {}
}
