import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import { router } from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { client } from './services/apolloClient'

createApp(App)
  .use(router)
  .use(vuetify)
  .provide(DefaultApolloClient, client)
  .mount('#app')