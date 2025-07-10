const DAYS = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."]

export function formatEventDate(start: Date, end: Date) {
  const day = DAYS[start.getDay()]
  const date = start.getDate()
  const startTime = start.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  const endTime = end.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })

  return `${day} ${date} | ${startTime} - ${endTime}`
}
