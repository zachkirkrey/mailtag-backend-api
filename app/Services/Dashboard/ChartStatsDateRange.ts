import { MONTH, WEEK_NUMBER, YEAR } from 'App/Helpers/date'
import { DateRangeString, RangeType } from 'App/Helpers/type'
import { DateTime } from 'luxon'

export default class ChartStatsDateRange {
  constructor(private range: RangeType) {}

  private startDate: DateTime
  private endDate: DateTime

  public getDates(start: DateTime, end: DateTime): DateRangeString {
    // TODO eliminate switch case here e.g. use polymorphism
    switch (this.range) {
      case 'this-week':
        return this.weekDateRanges(false)
      case 'last-week':
        return this.weekDateRanges(true)
      case 'this-month':
        return this.monthDateRanges(false)
      case 'last-month':
        return this.monthDateRanges(true)
      case 'this-year':
        return this.yearDateRanges(false)
      case 'last-year':
        return this.yearDateRanges(true)
      case 'custom':
        return this.customDateRanges(start, end)

      default:
        return this.monthDateRanges(false)
    }
  }

  private weekDateRanges(isLast: boolean) {
    const dateTime = DateTime.fromObject({
      weekYear: YEAR,
      weekNumber: isLast ? WEEK_NUMBER - 1 : WEEK_NUMBER,
    })

    this.startDate = dateTime.startOf('week')
    this.endDate = dateTime.endOf('week')

    return this.serializeRanges(this.startDate, this.endDate)
  }

  private monthDateRanges(isLast: boolean) {
    const dateTime = DateTime.fromObject({
      year: YEAR,
      month: isLast ? MONTH - 1 : MONTH,
    })

    this.startDate = dateTime.startOf('month')
    this.endDate = dateTime.endOf('month')

    return this.serializeRanges(this.startDate, this.endDate)
  }

  private yearDateRanges(isLast: boolean) {
    const dateTime = DateTime.fromObject({
      year: isLast ? YEAR - 1 : YEAR,
    })

    this.startDate = dateTime.startOf('year')
    this.endDate = dateTime.endOf('year')

    return this.serializeRanges(this.startDate, this.endDate)
  }

  private customDateRanges(startDate: DateTime, endDate: DateTime) {
    this.startDate = startDate
    this.endDate = endDate

    return this.serializeRanges(this.startDate, this.endDate)
  }

  private serializeRanges(startDate: DateTime, endDate: DateTime): DateRangeString {
    return {
      startDate,
      endDate,
    }
  }
}
