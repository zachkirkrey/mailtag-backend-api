export const filterEmailsByDate = (dates: string[], emails: any, type: string) => {
  return dates.map((date) => {
    const count = emails.filter((email: any) => {
      return email.createdAt.toSQL().split(' ')[0] <= date
    }).length

    return { date: date.split(' ')[0], count, type }
  })
}
