import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import { timeInUnix } from './date'
import { JwtPayload } from './type'

export const generateRefreshToken = (userId: string, providerId: string) => {
  const refreshToken = jwt.sign(
    { userId, providerId, timestamp: timeInUnix() },
    Env.get('APP_SECRET')
  )
  return refreshToken
}

export const verifyRefreshToken = (refreshToken: string) => {
  const payload = jwt.verify(refreshToken, Env.get('APP_SECRET')) as JwtPayload
  return payload.providerId
}
