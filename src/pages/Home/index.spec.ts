import { mount } from "@vue/test-utils"
import Home from "./index.vue"
import { describe, beforeEach, it, expect, vi, type Mock } from "vitest"
import { useSearchAnime } from "../../queries/useSearchAnime"
import { useRoute } from "vue-router"

vi.mock("../../queries/useSearchAnime", () => ({
  useSearchAnime: vi.fn(),
}))

vi.mock("vue-router", () => {
  const actual = vi.importActual("vue-router")
  return {
    ...actual,
    useRoute: vi.fn(() => ({ params: {} })),
    useRouter: vi.fn(() => ({ push: routerPushMock })),
  }
})

vi.mock("@vue/apollo-composable", () => {
  return {
    useQuery: vi.fn().mockReturnValue({
      result: {
        value: {
          Media: {
            id: 1,
            title: { romaji: "Naruto" },
            coverImage: { large: "naruto.jpg" },
          },
        },
      },
      loading: false,
      error: null,
    }),
  }
})

const routerPushMock = vi.fn()

describe("Home", () => {
  let animeListMock

  beforeEach(() => {
    animeListMock = [
      {
        id: 1,
        title: { romaji: "Naruto" },
        coverImage: { large: "naruto.jpg" },
      },
      {
        id: 2,
        title: { romaji: "Bleach" },
        coverImage: { large: "bleach.jpg" },
      },
    ]

    //routerPushMock = vi.fn()
    ;(useSearchAnime as any).mockReturnValue({
      animeList: animeListMock,
      loading: false,
      error: null,
    })
  })

  it("renders SearchBar", () => {
    const wrapper = mount(Home)
    expect(wrapper.find('[data-testid="search-bar"]').exists()).toBe(true)
  })

  it("shows anime cards when animeList has data", () => {
    const wrapper = mount(Home)
    expect(wrapper.findAll('[data-testid^="anime-card-"]').length).toBe(2)
  })

  it("shows loading spinner when loading", () => {
    ;(useSearchAnime as any).mockReturnValueOnce({
      animeList: [],
      loading: true,
      error: null,
    })
    const wrapper = mount(Home)
    expect(wrapper.find('[data-testid="loading-spinner"]').exists()).toBe(true)
  })

  it("shows error message when error", () => {
    ;(useSearchAnime as any).mockReturnValueOnce({
      animeList: [],
      loading: false,
      error: { message: "Something went wrong" },
    })
    const wrapper = mount(Home)
    expect(wrapper.find('[data-testid="error-message"]').exists()).toBe(true)
    expect(wrapper.text()).toContain(
      "Oops! Something went wrong. Try searching again."
    )
  })

  it("navigates to detail page when AnimeCard clicked", async () => {
    const wrapper = mount(Home)

    const animeCard = wrapper.find('[data-testid="anime-card-1"]')
    await animeCard.trigger("click")

    expect(routerPushMock).toHaveBeenCalledWith({
      name: "AnimeDetailModal",
      params: { id: 1 },
    })
  })

  it("renders AnimeDetailModal if selectedAnimeId exists", async () => {
    vi.mocked(useRoute).mockReturnValueOnce({ params: { id: 1 } })

    const wrapper = mount(Home)

    await wrapper.vm.$nextTick()

    const animeDetailModal = wrapper.find('[data-testid="anime-detail-modal"]')
    expect(animeDetailModal.exists()).toBe(true)
  })
})
