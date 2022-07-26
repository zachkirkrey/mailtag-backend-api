import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public isActive: boolean = true

  @column()
  public isDeleted: boolean = false

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public get serializedPlanInfo() {
    const { id, name, price, isActive, isDeleted } = this
    return { id, name, price, isActive, isDeleted }
  }
}
