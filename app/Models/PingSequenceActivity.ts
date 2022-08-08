import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import PingSequence from './PingSequence'

export default class PingSequenceActivity extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public status: string

  @column({ serializeAs: 'isDeleted' })
  public isDeleted: boolean = false

  @column({ serializeAs: 'pingSequenceId' })
  public pingSequenceId: string

  @column({ serializeAs: 'userId' })
  public userId: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => PingSequence)
  public pingSequence: BelongsTo<typeof PingSequence>
}
