import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import SearchBar from "./index.vue"

describe("SearchBar", () => {
  it("renders correctly", async () => {
    const wrapper = mount(SearchBar)

    const inputField = wrapper.find(".search-input")
    expect(inputField.exists()).toBe(true)
    expect(inputField.attributes().label).toBe(
      "Start typing to search for anime"
    )
  })

  it("emits 'search' event with the correct query", async () => {
    const wrapper = mount(SearchBar)

    wrapper.vm.searchQuery = "Naruto"
    await wrapper.vm.$nextTick()

    const inputField = wrapper.find(".search-input")
    await inputField.trigger("input")

    expect(wrapper.emitted()).toHaveProperty("search")
    expect(wrapper.emitted().search[0]).toEqual(["Naruto"])
  })
})
