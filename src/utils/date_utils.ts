export function format(date: Date): string {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function formatTime(date: Date): string {
  const d = new Date(date)
  return `${d.getHours()}:${d.getMinutes()}`
}

export function formatDateTime(date: Date): string {
  return `${format(date)} ${formatTime(date)}`
}
