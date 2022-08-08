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
import User from './User'
import { BorderRadiusTypes } from 'App/Helpers/type'
import SignatureEvent from './SignatureEvent'
import { isRelationshipPreloaded } from 'App/Helpers/model'

export default class Signature extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: 'userId' })
  public userId: string

  @column({ serializeAs: 'name' })
  public name: string

  @column({ serializeAs: 'title' })
  public title: string | null

  @column({ serializeAs: 'avatarUrl' })
  public avatarUrl: string | null

  // TODO make this column enum type
  @column({ serializeAs: 'avatarBorderRadiusType' })
  public avatarBorderRadiusType: BorderRadiusTypes = BorderRadiusTypes.SQUARE

  @column({ serializeAs: 'company' })
  public company: string | null

  @column({ serializeAs: 'email' })
  public email: string | null

  @column({ serializeAs: 'website' })
  public website: string | null

  @column({ serializeAs: 'officeAddress' })
  public officeAddress: string | null

  @column({ serializeAs: 'officePhoneNumber' })
  public officePhoneNumber: string | null

  @column({ serializeAs: 'homePhoneNumber' })
  public homePhoneNumber: string | null

  @column({ serializeAs: 'calendarUrl' })
  public calendarUrl: string | null

  @column({ serializeAs: 'bannerUrl' })
  public bannerUrl: string | null

  @column({ serializeAs: 'isBannerEnabled' })
  public isBannerEnabled: boolean = false

  @column({ serializeAs: 'isDeleted' })
  public isDeleted: boolean = false

  @column({ serializeAs: 'isDefault' })
  public isDefault: boolean = false

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @computed({ serializeAs: 'full_name' })
  public get fullName() {
    // TODO send type of model instance instead of string
    isRelationshipPreloaded(this, 'user')

    return this.user.fullName
  }

  @hasMany(() => SignatureEvent)
  public events: HasMany<typeof SignatureEvent>

  public get serializedSignatureBasicInfo() {
    const { id, name, isDefault, createdAt, updatedAt } = this

    return {
      id,
      name,
      isDefault,
      createdAt,
      updatedAt,
    }
  }

  public get serializedSignatureInfo() {
    const {
      id,
      userId,
      fullName,
      name,
      title,
      avatarUrl,
      company,
      email,
      avatarBorderRadiusType,
      website,
      officeAddress,
      officePhoneNumber,
      homePhoneNumber,
      bannerUrl,
      isBannerEnabled,
      isDeleted,
      isDefault,
    } = this

    return {
      id,
      userId,
      fullName,
      name,
      title,
      avatarUrl,
      company,
      email,
      avatarBorderRadiusType,
      website,
      officeAddress,
      officePhoneNumber,
      homePhoneNumber,
      bannerUrl,
      isBannerEnabled,
      isDeleted,
      isDefault,
    }
  }
}
