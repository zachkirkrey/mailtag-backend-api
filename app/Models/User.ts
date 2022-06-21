import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public providerId: string

  @column()
  public accountId: string

  @column()
  public username: string

  @column()
  public firstName: string | null

  @column()
  public lastName: string | null

  @column()
  public avatarUrl: string | null

  @computed()
  public get full_name() {
    if (!this.firstName || !this.lastName) {
      return null
    }

    return `${this.firstName} ${this.lastName}`
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
