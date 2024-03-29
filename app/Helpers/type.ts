import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account'
import Activity from 'App/Models/Activity'
import Coupon from 'App/Models/Coupon'
import Email from 'App/Models/Email'
import EmailEvent from 'App/Models/EmailEvent'
import Link from 'App/Models/Link'
import LinkEvent from 'App/Models/LinkEvent'
import Ping from 'App/Models/Ping'
import PingEmail from 'App/Models/PingEmail'
import PingEvent from 'App/Models/PingEvent'
import PingSequence from 'App/Models/PingSequence'
import PingSequenceActivity from 'App/Models/PingSequenceActivity'
import PingSequenceDetail from 'App/Models/PingSequenceDetail'
import Plan from 'App/Models/Plan'
import ReadEmail from 'App/Models/ReadEmail'
import ReadEmailActivity from 'App/Models/ReadEmailActivity'
import Signature from 'App/Models/Signature'
import SignatureEvent from 'App/Models/SignatureEvent'
import Subscription from 'App/Models/Subscription'
import Team from 'App/Models/Team'
import TeamInvite from 'App/Models/TeamInvite'
import TeamMember from 'App/Models/TeamMember'
import UnreadEmail from 'App/Models/UnreadEmail'
import UnreadEmailActivity from 'App/Models/UnreadEmailActivity'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export type AccountAttributes = Omit<
  ModelAttributes<InstanceType<typeof Account>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type UserAttributes = Omit<
  ModelAttributes<InstanceType<typeof User>>,
  'id' | 'createdAt' | 'updatedAt' | 'fullName' | 'serializedUserInfo'
>

export type EmailAttributes = Omit<
  ModelAttributes<InstanceType<typeof Email>>,
  'id' | 'createdAt' | 'updatedAt' | 'date' | 'time' | 'serializedEmailInfo'
>

export type EmailEventAttributes = Omit<
  ModelAttributes<InstanceType<typeof EmailEvent>>,
  'id' | 'createdAt' | 'updatedAt' | 'time' | 'serializedEmailEventInfo'
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
  'id' | 'createdAt' | 'updatedAt' | 'signatureClikedTime'
>

export type PingAttributes = Omit<
  ModelAttributes<InstanceType<typeof Ping>>,
  'id' | 'createdAt' | 'updatedAt' | 'time' | 'serializedPingInfo'
>

export type PingEventAttributes = Omit<
  ModelAttributes<InstanceType<typeof PingEvent>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type PingSequenceAttributes = Omit<
  ModelAttributes<InstanceType<typeof PingSequence>>,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'time'
  | 'serializedPingSequenceInfo'
  | 'pingsCount'
  | 'duration'
>

export type PingSequenceDetailAttributes = Omit<
  ModelAttributes<InstanceType<typeof PingSequenceDetail>>,
  'id' | 'createdAt' | 'updatedAt' | 'serializedPingSequenceDetailInfo'
>

export type PingSequenceActivityAttributes = Omit<
  ModelAttributes<InstanceType<typeof PingSequenceActivity>>,
  'id' | 'createdAt' | 'updatedAt' | 'serializedPingSequenceActivityInfo'
>

export type PingEmailAttributes = Omit<
  ModelAttributes<InstanceType<typeof PingEmail>>,
  'id' | 'createdAt' | 'updatedAt' | 'serializedPingEmailInfo'
>

export type ReadEmailAttributes = Omit<
  ModelAttributes<InstanceType<typeof ReadEmail>>,
  'id' | 'createdAt' | 'updatedAt' | 'readTimes' | 'date' | 'time' | 'serializedReadEmailInfo'
>

export type ReadEmailActivityAttributes = Omit<
  ModelAttributes<InstanceType<typeof ReadEmailActivity>>,
  'id' | 'createdAt' | 'updatedAt' | 'date' | 'time' | 'serializedReadEmailActivity'
>

export type UnreadEmailAttributes = Omit<
  ModelAttributes<InstanceType<typeof UnreadEmail>>,
  'id' | 'createdAt' | 'updatedAt' | 'date' | 'time' | 'serializedUnreadEmailInfo'
>

export type UnreadEmailActivityAttributes = Omit<
  ModelAttributes<InstanceType<typeof UnreadEmailActivity>>,
  'id' | 'createdAt' | 'updatedAt' | 'date' | 'time' | 'serializedUnreadEmailActivity'
>

export type ActivityAttributes = Omit<
  ModelAttributes<InstanceType<typeof Activity>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type TeamAttributes = Omit<
  ModelAttributes<InstanceType<typeof Team>>,
  'id' | 'createdAt' | 'updatedAt' | 'serializedTeamInfo' | 'skuId'
>

export type TeamMemberAttributes = Omit<
  ModelAttributes<InstanceType<typeof TeamMember>>,
  'id' | 'createdAt' | 'updatedAt' | 'serializedTeamMemberInfo'
>

export type TeamInviteAttributes = Omit<
  ModelAttributes<InstanceType<typeof TeamInvite>>,
  'id' | 'createdAt' | 'updatedAt' | 'serializedTeamInviteInfo'
>

export type SubscriptionAttributes = Omit<
  ModelAttributes<InstanceType<typeof Subscription>>,
  'id' | 'createdAt' | 'updatedAt' | 'serializedSubscriptionInfo'
>

export type PlanAttributes = Omit<
  ModelAttributes<InstanceType<typeof Plan>>,
  'id' | 'createdAt' | 'updatedAt' | 'serializedPlanInfo'
>

export type CouponAttributes = Omit<
  ModelAttributes<InstanceType<typeof Coupon>>,
  'id' | 'createdAt' | 'updatedAt' | 'serializedCouponInfo'
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
  startDate: DateTime
  endDate: DateTime
}

export const ReadEmailActivityTypes = ['open', 'read']
export type ReadEmailActivityType = typeof ReadEmailActivityTypes[number]

export type ChartData = {
  date: string
  count: number
  type: string
}

export type JwtPayload = {
  userId: User['id']
  providerId: User['providerId']
  iat: number
}

export enum SQSMessageTypes {
  WELCOME_EMAIL = 'welcome_email',
  PING = 'ping',
}
