import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import Email from './Email'
import LinkEvent from './LinkEvent'
import Config from '@ioc:Adonis/Core/Config'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public emailId: string

  @column()
  public link: string

  @column()
  public isDeleted: boolean = false

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Email)
  public email: BelongsTo<typeof Email>

  @hasMany(() => LinkEvent)
  public events: HasMany<typeof LinkEvent>

  @computed()
  public get trackingUrl() {
    return `${Config.get('app.productionClientBaseUrl')}/link-events?id=${this.id}&url=${this.link}`
  }

  @computed()
  public get date() {
    return this.createdAt.toLocaleString(DateTime.DATE_MED)
  }

  @computed()
  public get time() {
    return this.createdAt.toRelative()
  }
}
