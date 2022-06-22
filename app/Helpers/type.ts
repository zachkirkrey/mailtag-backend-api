import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account'
import User from 'App/Models/User'

export type AccountAttributes = Omit<
  ModelAttributes<InstanceType<typeof Account>>,
  'id' | 'createdAt' | 'updatedAt'
>

export type UserAttributes = Omit<
  ModelAttributes<InstanceType<typeof User>>,
  'id' | 'createdAt' | 'updatedAt' | 'fullName'
>
