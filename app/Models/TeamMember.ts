import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Team from './Team'

export default class TeamMember extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'email' })
  public email: string

  @column({ serializeAs: 'teamId' })
  public teamId: string

  @column({ serializeAs: 'isDeleted' })
  public isDeleted: boolean = false

  @column({ serializeAs: 'isAdmin' })
  public isAdmin: boolean = false

  @column({ serializeAs: null })
  public status: string = 'invited' //TODO make this enum based on invitation controller

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Team)
  public team: BelongsTo<typeof Team>
}
