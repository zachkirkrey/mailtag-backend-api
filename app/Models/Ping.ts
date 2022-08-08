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
import PingEvent from './PingEvent'
import User from './User'
import PingSequence from './PingSequence'

export default class Ping extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'emailId' })
  public emailId: string

  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: null })
  public pingSequenceId: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Email)
  public email: BelongsTo<typeof Email>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => PingSequence)
  public pingSequence: BelongsTo<typeof PingSequence>

  @hasMany(() => PingEvent)
  public events: HasMany<typeof PingEvent>

  @computed()
  public get time() {
    return this.createdAt.toRelative()
  }
}
