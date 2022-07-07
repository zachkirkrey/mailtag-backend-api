import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account'
import Activity from 'App/Models/Activity'
import Email from 'App/Models/Email'
import EmailEvent from 'App/Models/EmailEvent'
import Link from 'App/Models/Link'
import LinkEvent from 'App/Models/LinkEvent'
import Ping from 'App/Models/Ping'
import PingEvent from 'App/Models/PingEvent'
import ReadEmail from 'App/Models/ReadEmail'
import ReadEmailActivity from 'App/Models/ReadEmailActivity'
import Signature from 'App/Models/Signature'
import SignatureEvent from 'App/Models/SignatureEvent'
import UnreadEmail from 'App/Models/UnreadEmail'
import UnreadEmailActivity from 'App/Models/UnreadEmailActivity'
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
  'id' | 'createdAt' | 'updatedAt' | 'time' | 'serializedEmailInfo'
>

export type EmailEventAttributes = Omit<
  ModelAttributes<InstanceType<typeof EmailEvent>>,
  'id' | 'createdAt' | 'updatedAt' | 'time'
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
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'fullName'
  | 'serializedSignatureBasicInfo'
  | 'serializedSignatureInfo'
>

export type SignatureEventAttributes = Omit<
  ModelAttributes<InstanceType<typeof SignatureEvent>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type PingAttributes = Omit<
  ModelAttributes<InstanceType<typeof Ping>>,
  'id' | 'createdAt' | 'updatedAt' | 'time' | 'serializedPingInfo'
>

export type PingEventAttributes = Omit<
  ModelAttributes<InstanceType<typeof PingEvent>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type ReadEmailAttributes = Omit<
  ModelAttributes<InstanceType<typeof ReadEmail>>,
  'id' | 'createdAt' | 'updatedAt' | 'readTimes' | 'time' | 'serializedEmailInfo'
>

export type ReadEmailActivityAttributes = Omit<
  ModelAttributes<InstanceType<typeof ReadEmailActivity>>,
  'id' | 'createdAt' | 'updatedAt' | 'date'
>

export type UnreadEmailAttributes = Omit<
  ModelAttributes<InstanceType<typeof UnreadEmail>>,
  'id' | 'createdAt' | 'updatedAt' | 'time' | 'serializedEmailInfo'
>

export type UnreadEmailActivityAttributes = Omit<
  ModelAttributes<InstanceType<typeof UnreadEmailActivity>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type ActivityAttributes = Omit<
  ModelAttributes<InstanceType<typeof Activity>>,
  'id' | 'createdAt' | 'updatedAt'
>

export enum BorderRadiusTypes {
  SQUARE = 'square',
  CIRCLE = 'circle',
}

export enum ChartFilterRanges {
  THIS_WEEK = 'this-week',
  LAST_WEEK = 'last-week',
  THIS_MONTH = 'this-month',
  LAST_MONTH = 'last-month',
  THIS_YEAR = 'this-year',
  LAST_YEAR = 'last-year',
  CUSTOM = 'custom',
}

type ReverseMap<T> = T[keyof T]
export type RangeType = ReverseMap<typeof ChartFilterRanges>

export type DateRangeString = {
  startDate: string
  endDate: string
}

export const ReadEmailActivityTypes = ['open', 'read']
export type ReadEmailActivityType = typeof ReadEmailActivityTypes[number]
