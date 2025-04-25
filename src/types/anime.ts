export interface Anime {
    id: number
    title: {
      romaji: string
    }
    averageScore?: number
    description?: string
    coverImage: {
      large: string
    }
    startDate?: {
      year?: number
      month?: number
      day?: number
    }
  }