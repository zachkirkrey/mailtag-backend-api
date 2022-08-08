import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Team from './Team'

export default class TeamInvite extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'email' })
  public email: string

  @column({ serializeAs: 'teamId' })
  public teamId: string

  @column({ serializeAs: 'isDeleted' })
  public isDeleted: boolean = false

  @column({ serializeAs: 'isAccepted' })
  public isAccepted: boolean = false

  @belongsTo(() => Team)
  public team: BelongsTo<typeof Team>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
