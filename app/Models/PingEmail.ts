import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import PingSequence from './PingSequence'
import Email from './Email'

export default class PingEmail extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public recipient: string

  @column()
  public name: string

  @column()
  public subject: string | null

  @column()
  public status: string

  @column()
  public isDeleted: boolean = false

  @column()
  public userId: string

  @column()
  public pingSequenceId: string

  @column()
  public gmailMessageId: string

  @column()
  public gmailThreadId: string

  @column()
  public emailId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => PingSequence)
  public pingSequence: BelongsTo<typeof PingSequence>

  @belongsTo(() => Email)
  public email: BelongsTo<typeof Email>
}
