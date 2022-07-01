import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Email from './Email'
import ReadEmailActivity from './ReadEmailActivity'

export default class ReadEmail extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public emailId: string

  @column()
  public device: string

  @computed()
  // TODO count from this.activities with type read / reopen
  public get readTimes() {
    return 1
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Email)
  public email: BelongsTo<typeof Email>

  @hasMany(() => ReadEmailActivity)
  public activities: HasMany<typeof ReadEmailActivity>
}
