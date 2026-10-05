const formatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
})

export function formatPostDate(value: string) {
  return formatter.format(new Date(value))
}
