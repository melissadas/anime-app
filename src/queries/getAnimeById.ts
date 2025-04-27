import { gql } from '@apollo/client/core'

export const GET_ANIME_BY_ID = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
      }
      description
      averageScore
      coverImage {
        large
      }
      startDate {
        year
        month
        day
      }
    }
  }
`