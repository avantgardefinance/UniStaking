export function formatDate(date: Date) {
  return date.toLocaleString().slice(0, -3) // slice to remove seconds
}
