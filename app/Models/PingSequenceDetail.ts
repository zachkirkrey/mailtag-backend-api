import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import PingSequence from './PingSequence'

export default class PingSequenceDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  // TODO: rename pingname to name after the data migration
  @column({ serializeAs: 'pingName' })
  public pingName: string

  @column({ serializeAs: 'day' })
  public day: number

  @column({ serializeAs: 'step' })
  public step: number

  @column({ serializeAs: 'html' })
  public html: string

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

  // TODO: check if this is necessary at all
  // It exists in the old codebase, not sure where it's used.
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => PingSequence)
  public pingSequence: BelongsTo<typeof PingSequence>
}
