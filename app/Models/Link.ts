import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Email from './Email'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public emailId: string

  @column()
  public body: string

  @column()
  public isDeleted: boolean = false

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Email)
  public email: BelongsTo<typeof Email>
}
