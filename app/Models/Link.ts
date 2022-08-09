import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Email from './Email'
import LinkEvent from './LinkEvent'
import Env from '@ioc:Adonis/Core/Env'

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

  @hasMany(() => LinkEvent)
  public events: HasMany<typeof LinkEvent>

  @computed()
  public get trackingUrl() {
    const url = `${Env.get('PRODUCTION_API_BASE_URL')}/link-events?id=${this.id}&url=${this.body}`

    return url
  }

  @computed()
  public get date() {
    return this.createdAt.toLocaleString(DateTime.DATE_MED)
  }

  @computed()
  public get time() {
    return this.createdAt.toRelative()
  }

  public get serializedLinkInfo() {
    const { id, emailId, body, isDeleted, trackingUrl, date, time } = this

    return { id, emailId, body, isDeleted, trackingUrl, date, time }
  }
}
