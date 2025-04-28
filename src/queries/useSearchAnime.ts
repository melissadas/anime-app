import { gql } from "@apollo/client/core"
import { useQuery } from "@vue/apollo-composable"
import { type Ref, computed, watch } from "vue"
import debounce from "lodash.debounce"
import type { Anime } from "../types/anime"

export const SEARCH_ANIME = gql`
  query ($search: String) {
    Page(perPage: 10) {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`

export function useSearchAnime(searchTerm: Ref<string>) {
  const { result, loading, error, refetch } = useQuery(SEARCH_ANIME, () => ({
    search: searchTerm.value,
  }))

  const debouncedRefetch = debounce(() => {
    refetch()
  }, 800)

  // Watch for changes in searchTerm and trigger debounced refetch
  watch(searchTerm, (newVal) => {
    if (newVal.trim() === "") {
      refetch() // Immediate refetch to reset when input cleared
    } else {
      debouncedRefetch()
    }
  })

  const animeList = computed(() => {
    return (
      result.value?.Page?.media.filter((anime: Anime) => {
        return anime.title.romaji
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase())
      }) ?? []
    )
  })

  return {
    animeList,
    loading,
    error,
  }
}
