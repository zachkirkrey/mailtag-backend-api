import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Settings extends BaseModel {
  public static override table = 'settings'

  @column({ isPrimary: true })
  public id: string

  @column()
  public timezone: string = 'UTC'

  @column()
  public language: string = 'en'

  @column()
  public country: string = 'US'

  @column()
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
