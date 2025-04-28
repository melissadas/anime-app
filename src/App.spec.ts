import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

describe('App.vue', () => {
  it('renders the title', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Anime Explorer')
  })

  it('renders v-app', () => {
    const wrapper = mount(App)
    expect(wrapper.find('v-app').exists()).toBe(true)
  })
})
