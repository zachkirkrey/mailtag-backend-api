import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Stripe from 'stripe'

export default class StripeEvent extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ isPrimary: true })
  public stripeEventId: string

  @column()
  public data: Stripe.Event.Data.Object

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
