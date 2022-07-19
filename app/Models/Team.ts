import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import TeamMember from './TeamMember'
import TeamInvite from './TeamInvite'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public owner: string

  @column()
  public userId: string

  @column()
  public isDeleted: boolean = false

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  public get serializedTeamInfo() {
    const { id, name, owner, userId, isDeleted } = this

    return {
      id,
      name,
      owner,
      userId,
      isDeleted,
    }
  }

  @hasMany(() => TeamMember)
  public teamMembers: HasMany<typeof TeamMember>

  @hasMany(() => TeamInvite)
  public teamInvites: HasMany<typeof TeamInvite>
}
