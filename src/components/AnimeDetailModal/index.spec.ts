import { describe, it, expect, beforeEach, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { useQuery } from "@vue/apollo-composable"
import AnimeDetailModal from "./index.vue"

vi.mock("@vue/apollo-composable", () => {
  return {
    useQuery: vi.fn(),
  }
})

const animeMock = {
  title: { romaji: "Naruto" },
  coverImage: { large: "http://example.com/naruto.jpg" },
  averageScore: 85,
  startDate: { year: 2002, month: 10, day: 3 },
  description: "A sample description",
}

describe("AnimeDetailModal.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders anime details when data is available", async () => {
    ;(useQuery as any).mockReturnValue({
      result: { value: { Media: animeMock } },
      loading: false,
      error: null,
    })

    const wrapper = mount(AnimeDetailModal, {
      props: { animeId: 1 },
    })

    expect(wrapper.text()).toContain("Naruto")
    expect(wrapper.text()).toContain("Score:85")
    expect(wrapper.html()).toContain(animeMock.description)
  })

  it("shows error fallback when there is an error", () => {
    ;(useQuery as any).mockReturnValue({
      result: { value: null },
      loading: false,
      error: { message: "Error!" },
    })

    const wrapper = mount(AnimeDetailModal, {
      props: { animeId: 1 },
    })

    expect(wrapper.text()).toContain("Anime not found or failed to load")
  })

  it("emits close event when clicking close button", async () => {
    ;(useQuery as any).mockReturnValue({
      result: { value: { Media: animeMock } },
      loading: false,
      error: null,
    })

    const wrapper = mount(AnimeDetailModal, {
      props: { animeId: 1 },
    })

    const closeButton = wrapper.find(".close-button")
    await closeButton.trigger("click")

    expect(wrapper.emitted()).toHaveProperty("close")
  })
})
