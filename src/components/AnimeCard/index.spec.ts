import { mount } from "@vue/test-utils"
import AnimeCard from "./index.vue"
import { describe, beforeEach, it, expect } from "vitest"

const anime = {
  title: { romaji: "Naruto" },
  coverImage: { large: "http://example.com/naruto.jpg" },
}

describe("AnimeCard.vue", () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(AnimeCard, {
      props: {
        anime,
      },
    })
  })

  it("renders anime cover image with correct src and alt", () => {
    const img = wrapper.find("v-img")

    expect(img.exists()).toBe(true)
    expect(img.attributes("src")).toBe(anime.coverImage.large)
    expect(img.attributes("alt")).toBe(anime.title.romaji)
  })

  it("renders anime title correctly", () => {
    expect(wrapper.text()).toContain(anime.title.romaji)
  })

  it("emits a click event when clicked", async () => {
    await wrapper.find(".anime-card-wrapper").trigger("click")

    expect(wrapper.emitted()).toHaveProperty("click")
  })
})
