import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account'
import Email from 'App/Models/Email'
import EmailEvent from 'App/Models/EmailEvent'
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
