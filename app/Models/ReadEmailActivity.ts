import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { ReadEmailActivityType } from 'App/Helpers/type'
import ReadEmail from './ReadEmail'

export default class ReadEmailActivity extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public readEmailId: string

  @column()
  public type: ReadEmailActivityType

  @column()
  public device: string

  @column()
  public location: string

  @column()
  public recipient: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ReadEmail)
  public readEmail: BelongsTo<typeof ReadEmail>

  @computed()
  public get date() {
    return this.createdAt.toLocaleString(DateTime.DATE_MED)
  }
}
