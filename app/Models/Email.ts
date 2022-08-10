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
import EmailEvent from './EmailEvent'
import User from './User'
import Ping from './Ping'
import ReadEmail from './ReadEmail'
import UnreadEmail from './UnreadEmail'
import Link from './Link'
import { EmailRecipient } from 'App/Helpers/type'

export default class Email extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public signatureId: string | null

  @column()
  public recipient: Array<EmailRecipient> = []

  @column()
  public bccRecipient: Array<EmailRecipient> = []

  @column()
  public ccRecipient: Array<EmailRecipient> = []

  @column()
  public destinationEmail: string | null

  @column()
  public subject: string | null

  @column()
  public name: string | null

  @column()
  public gmailMessageId: string

  @column()
  public gmailThreadId: string

  @column()
  public timeZone: string | null

  @column()
  public emailBody: string | null

  @column()
  public isDeleted: boolean = false

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => EmailEvent)
  public events: HasMany<typeof EmailEvent>

  @hasMany(() => Link)
  public links: HasMany<typeof Link>

  @hasMany(() => Ping)
  public pings: HasMany<typeof Ping>

  @hasOne(() => ReadEmail)
  public readEmail: HasOne<typeof ReadEmail>

  @hasOne(() => UnreadEmail)
  public unreadEmail: HasOne<typeof UnreadEmail>

  @computed()
  public get date() {
    return this.createdAt.toLocaleString(DateTime.DATE_MED)
  }

  @computed()
  public get time() {
    return this.createdAt.toRelative()
  }
}
