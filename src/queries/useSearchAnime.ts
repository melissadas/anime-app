import { gql } from "@apollo/client/core"
import { useQuery } from "@vue/apollo-composable"
import { type Ref, computed, watch, ref } from "vue"
import debounce from "lodash.debounce"
import type { Anime } from "../types/anime"

export const SEARCH_ANIME = gql`
  query ($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        hasNextPage
        lastPage
      }
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
  const page = ref(1)
  const perPage = 10
  const animeList = ref<Anime[]>([])

  const { result, loading, error, refetch, fetchMore } = useQuery(
    SEARCH_ANIME,
    () => ({
      search: searchTerm.value,
      page: page.value,
      perPage,
    })
  )

  const debouncedRefetch = debounce(() => {
    page.value = 1
    refetch()
  }, 800)

  // Watch for changes in searchTerm and trigger debounced refetch
  watch(searchTerm, (newVal) => {
    if (newVal.trim() === "") {
      page.value = 1
      refetch() // Immediate refetch to reset when input cleared
    } else {
      debouncedRefetch()
    }
  })

  watch(result, (newVal) => {
    if (Array.isArray(newVal?.Page?.media)) {
      const allMedia = newVal?.Page?.media ?? []

      // Filter exact title match (case-insensitive)
      const exactMatch = allMedia.filter((anime: Anime) =>
        anime.title.romaji
          .toLowerCase()
          .includes(searchTerm.value.trim().toLowerCase())
      )

      if (page.value === 1) {
        animeList.value = exactMatch
      } else {
        animeList.value = [...animeList.value, ...exactMatch]
      }
    }
  })

  const hasNextPage = computed(() => result.value?.Page?.pageInfo?.hasNextPage)

  const loadMore = async () => {
    if (!hasNextPage.value) return
    page.value += 1
    await fetchMore({
      variables: {
        page: page.value,
        perPage,
      },
      updateQuery: (_prevResult, { fetchMoreResult }) => {
        return fetchMoreResult
      },
    })
  }

  return {
    animeList,
    loading,
    error,
    loadMore,
    hasNextPage,
  }
}
