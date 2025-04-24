<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from './components/SearchBar/index.vue'

const searchTerm = ref('')

function onSearch(query: string) {
  searchTerm.value = query
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="py-8">
        <SearchBar @search="onSearch" />
        <p v-if="searchTerm">You searched for: <strong>{{ searchTerm }}</strong></p>
      </v-container>
    </v-main>
  </v-app>
</template>