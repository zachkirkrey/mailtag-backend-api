import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Email from './Email'

export default class EmailEvent extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public emailId: string

  @column()
  public device: string

  @column()
  public userAgent: string

  @column()
  public location: string

  @column()
  public emailReadTime: DateTime | null

  @column()
  public emailClickedDeviceName: string

  @column()
  public readRecipient: string | null

  @column()
  public isDeleted: boolean = false

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Email)
  public email: BelongsTo<typeof Email>

  @computed()
  public get time() {
    return this.createdAt.toRelative()
  }

  public get serializedEmailEventInfo() {
    const { id, emailId, device, userAgent, location, time } = this

    return { id, emailId, device, userAgent, location, time }
  }
}
