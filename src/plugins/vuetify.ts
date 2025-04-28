import "vuetify/styles/main.css"
import { config } from "@vue/test-utils"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
})

config.global.plugins = [vuetify]
