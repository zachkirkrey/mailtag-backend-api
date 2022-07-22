import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Email from './Email'
import Account from './Account'
import Signature from './Signature'
import ReadEmail from './ReadEmail'
import UnreadEmail from './UnreadEmail'
import Ping from './Ping'
import Team from './Team'
import Settings from './Settings'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public providerId: string

  @column()
  public accountId: string

  @column()
  public username: string

  @column()
  public firstName: string | null

  @column()
  public lastName: string | null

  @column()
  public avatarUrl: string | null

  @computed({ serializeAs: 'full_name' })
  public get fullName() {
    if (!this.firstName || !this.lastName) {
      return null
    }

    return `${this.firstName} ${this.lastName}`
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Email)
  public emails: HasMany<typeof Email>

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @hasOne(() => Settings)
  public settings: HasOne<typeof Settings>

  @hasMany(() => Signature)
  public signatures: HasMany<typeof Signature>

  @hasMany(() => ReadEmail)
  public readEmails: HasMany<typeof ReadEmail>

  @hasMany(() => UnreadEmail)
  public unreadEmails: HasMany<typeof UnreadEmail>

  @hasMany(() => Ping)
  public pings: HasMany<typeof Ping>

  @hasOne(() => Team, {
    foreignKey: 'ownerId',
  })
  public team: HasOne<typeof Team>

  @column()
  public refreshToken: string

  public get serializedUserInfo() {
    const {
      id,
      email,
      providerId,
      accountId,
      username,
      firstName,
      lastName,
      fullName,
      avatarUrl,
      refreshToken,
    } = this
    return {
      id,
      email,
      providerId,
      accountId,
      username,
      firstName,
      lastName,
      fullName,
      avatarUrl,
      refreshToken,
    }
  }
}
