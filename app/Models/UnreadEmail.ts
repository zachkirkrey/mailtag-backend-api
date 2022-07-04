import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Email from './Email'
import UnreadEmailActivity from './UnreadEmailActivity'

export default class UnreadEmail extends BaseModel {
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

  @hasMany(() => UnreadEmailActivity)
  public activities: HasMany<typeof UnreadEmailActivity>

  @computed()
  public get time() {
    return this.createdAt.toRelative()
  }
}
