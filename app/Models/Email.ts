import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import EmailEvent from './EmailEvent'
import User from './User'
import Ping from './Ping'
import ReadEmailActivity from './ReadEmailActivity'
import ReadEmail from './ReadEmail'

export default class Email extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public recipient: string

  @column()
  public subject: string | null

  @column()
  public gmailMessageId: string

  @column()
  public gmailThreadId: string

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

  @hasMany(() => Ping)
  public pings: HasMany<typeof Ping>

  @hasMany(() => ReadEmailActivity)
  public activities: HasMany<typeof ReadEmailActivity>

  @hasOne(() => ReadEmail)
  public readEmail: HasOne<typeof ReadEmail>

  // TODO add fixed scopes to model
  public static today = scope((query) => {
    const todayDate = DateTime.local(
      DateTime.local().year,
      DateTime.local().month,
      DateTime.local().day
    ).toSQL()

    query.where('created_at', '>=', todayDate)
  })
}
