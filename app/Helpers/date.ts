import { DateTime, Duration } from 'luxon'

export const daysAgo = (days: number) => {
  const now = DateTime.now()
  return now.minus(Duration.fromObject({ days }))
}

export const monthsAgo = (months: number) => {
  const now = DateTime.now()
  return now.minus(Duration.fromObject({ months }))
}

export const timeInUnix = () => {
  const now = DateTime.now()
  return now.toUnixInteger()
}

export const LOCAL_DATE = DateTime.local()
export const YEAR = LOCAL_DATE.year
export const MONTH = LOCAL_DATE.month
export const DAY = LOCAL_DATE.day
export const LOCAL_DATE_WITH_PARAMS = DateTime.local(YEAR, MONTH, DAY)
export const WEEK_NUMBER = LOCAL_DATE_WITH_PARAMS.weekNumber
