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
  public status: string = 'stopped' //TODO add enum value type

  @column({ serializeAs: 'isDeleted' })
  public isDeleted: boolean = false

  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: 'pingSequenceId' })
  public pingSequenceId: string

  @column({ serializeAs: 'gmailMessageId' })
  public gmailMessageId: string

  @column({ serializeAs: 'gmailThreadId' })
  public gmailThreadId: string

  @column({ serializeAs: 'emailId' })
  public emailId: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => PingSequence)
  public pingSequence: BelongsTo<typeof PingSequence>

  @belongsTo(() => Email)
  public email: BelongsTo<typeof Email>
}
