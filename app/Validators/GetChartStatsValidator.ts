import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ChartFilterRanges } from 'App/Helpers/type'

export default class GetChartStatsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    range: schema.enum.optional(Object.values(ChartFilterRanges), [
      rules.requiredIfNotExistsAll(['start', 'end']),
    ]),
    start: schema.date.optional(
      {
        format: 'dd-MM-yyyy',
      },
      [rules.requiredIfExists('end')]
    ),
    end: schema.date.optional(
      {
        format: 'dd-MM-yyyy',
      },
      [rules.requiredIfExists('start')]
    ),
  })

  public messages: CustomMessages = {}
}
