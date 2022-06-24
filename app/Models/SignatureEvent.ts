import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Signature from './Signature'

export default class SignatureEvent extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public signatureId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Signature)
  public signature: BelongsTo<typeof Signature>
}
