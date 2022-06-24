import { DateTime, Duration } from 'luxon'

export const daysAgo = (days: number) => {
  const now = DateTime.now()
  return now.minus(Duration.fromObject({ days }))
}

export const monthsAgo = (months: number) => {
  const now = DateTime.now()
  return now.minus(Duration.fromObject({ months }))
}
