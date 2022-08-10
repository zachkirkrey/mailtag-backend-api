import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Link from './Link'

export default class LinkEvent extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public linkId: string

  @column()
  public device: string

  @column()
  public userAgent: string

  @column()
  public location: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Link)
  public link: BelongsTo<typeof Link>
}
