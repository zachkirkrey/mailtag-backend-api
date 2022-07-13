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
import Ping from './Ping'
import { isRelationshipPreloaded } from 'App/Helpers/model'
import User from './User'

export default class PingSequence extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public duration: string

  @column()
  public isDeleted: boolean = false

  @column()
  public userId: string

  @column()
  public recipientTimezone: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Ping)
  public pings: HasMany<typeof Ping>

  @computed()
  public get pingsCount() {
    isRelationshipPreloaded(this, 'pings')
    return this.pings.length
  }

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  public get time() {
    return this.createdAt.toRelative()
  }

  public get serializedPingSequenceInfo() {
    const { id, name, pingsCount, recipientTimezone, userId, isDeleted, duration } = this

    return {
      id,
      name,
      pingsCount,
      recipientTimezone,
      userId,
      isDeleted,
      duration,
    }
  }
}
