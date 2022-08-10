import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Coupon extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public code: string

  @column({ serializeAs: 'userId' })
  public userId: string

  @column()
  public percentage: number

  @column({ serializeAs: 'isRepetitive' })
  public isRepetitive: boolean

  @column({ serializeAs: 'isDeleted' })
  public isDeleted: boolean = false

  @column({ serializeAs: 'isUsed' })
  public isUsed: boolean = false

  @column.dateTime({ serializeAs: null })
  public usedAt: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
