import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import PingSequence from './PingSequence'

export default class PingSequenceDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public day: number

  @column()
  public step: number

  @column()
  public html: string

  @column()
  public isDeleted: boolean

  @column()
  public pingSequenceId: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => PingSequence)
  public pingSequence: BelongsTo<typeof PingSequence>
}
