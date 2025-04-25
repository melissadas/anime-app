import { gql } from '@apollo/client/core'
import { useQuery } from '@vue/apollo-composable'
import { type Ref, computed, watch } from 'vue'

const SEARCH_ANIME = gql`
  query ($search: String) {
    Page(perPage: 10) {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
        }
        averageScore
        description
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
  }
`

export function useSearchAnime(searchTerm: Ref<string>) {
  const { result, loading, error, refetch } = useQuery(SEARCH_ANIME, () => ({
    search: searchTerm.value
  }))

  const animeList = computed(() => result.value?.Page?.media ?? [])

  watch(searchTerm, () => {
    refetch()
  })

  return {
    animeList,
    loading,
    error
  }
}