import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Email from './Email'
import PingEvent from './PingEvent'

export default class Ping extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public emailId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Email)
  public email: BelongsTo<typeof Email>

  @hasMany(() => PingEvent)
  public events: HasMany<typeof PingEvent>
}
