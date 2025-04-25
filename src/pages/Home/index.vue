<script setup lang="ts">
import { ref } from 'vue'
import debounce from 'lodash.debounce'
import SearchBar from '../../components/SearchBar/index.vue'
import AnimeCard from '../../components/AnimeCard/index.vue'
import { useSearchAnime } from '../../queries/useSearchAnime'

const searchTerm = ref('')
const onSearch = debounce((query: string) => {
  searchTerm.value = query
}, 300)

const { animeList, loading, error } = useSearchAnime(searchTerm)
</script>

<template>
  <v-container class="py-8 pt-6">
    <SearchBar @search="onSearch" />
    <p v-if="searchTerm">Looking for: <strong>{{ searchTerm }}</strong></p>
    <p v-if="loading">Loading...</p>
    <p v-if="error">Something went wrong!</p>

    <v-row v-if="animeList.length" dense>
      <v-col v-for="anime in animeList" :key="anime.id" cols="12" sm="6" md="4" lg="3">
        <AnimeCard :anime="anime" />
      </v-col>
    </v-row>
  </v-container>
</template>
