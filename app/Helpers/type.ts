import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account'
import Email from 'App/Models/Email'
import EmailEvent from 'App/Models/EmailEvent'
import Link from 'App/Models/Link'
import LinkEvent from 'App/Models/LinkEvent'
import Signature from 'App/Models/Signature'
import User from 'App/Models/User'

export type AccountAttributes = Omit<
  ModelAttributes<InstanceType<typeof Account>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type UserAttributes = Omit<
  ModelAttributes<InstanceType<typeof User>>,
  'id' | 'createdAt' | 'updatedAt' | 'fullName'
>

export type EmailAttributes = Omit<
  ModelAttributes<InstanceType<typeof Email>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type EmailEventAttributes = Omit<
  ModelAttributes<InstanceType<typeof EmailEvent>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type LinkAttributes = Omit<
  ModelAttributes<InstanceType<typeof Link>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type LinkEventAttributes = Omit<
  ModelAttributes<InstanceType<typeof LinkEvent>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type SignatureAttributes = Omit<
  ModelAttributes<InstanceType<typeof Signature>>,
  'id' | 'createdAt' | 'updatedAt' | 'fullName'
>

export enum BorderRadiusTypes {
  SQUARE = 'square',
  CIRCLE = 'circle',
}
