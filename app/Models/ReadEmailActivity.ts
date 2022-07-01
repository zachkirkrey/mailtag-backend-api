import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { ReadEmailActivityType } from 'App/Helpers/type'
import ReadEmail from './ReadEmail'

export default class ReadEmailActivity extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public readEmailId: string

  @column()
  public type: ReadEmailActivityType

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ReadEmail)
  public readEmail: BelongsTo<typeof ReadEmail>
}
