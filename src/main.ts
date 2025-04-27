import { createApp } from 'vue'
import './assets/styles/style.scss'
import './assets/styles/typography.scss'
import './assets/styles/_vuetify-overrides.scss'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import { router } from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { client } from './services/apolloClient'
import '@mdi/font/css/materialdesignicons.css'

createApp(App)
  .use(router)
  .use(vuetify)
  .provide(DefaultApolloClient, client)
  .mount('#app')