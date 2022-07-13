import { validator } from '@ioc:Adonis/Core/Validator'
import { IANAZone } from 'luxon'

validator.rule('timezone', (value, _, options) => {
  if (!IANAZone.isValidZone(value)) {
    options.errorReporter.report(
      options.pointer,
      'timezone',
      'timezone validation failed',
      options.arrayExpressionPointer
    )
  }
})
