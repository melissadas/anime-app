import type { Anime } from "../types/anime"

const getMonthName = (month: number): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return months[month - 1]
}

export const formatDate = (date?: Anime["startDate"]): string => {
  if (!date || !date.year) return "N/A"

  const { year, month, day } = date

  const startDate = new Date(year, month - 1, day)
  const today = new Date()

  const dayFormatted = String(day).padStart(2, "0")
  const monthFormatted = getMonthName(month)

  if (startDate <= today && today.getFullYear() === year) {
    return "Airing now"
  }

  if (startDate < today) {
    return `Last aired on ${dayFormatted} ${monthFormatted} ${year}`
  }

  return `Will be airing on ${dayFormatted} ${monthFormatted} ${year}`
}
