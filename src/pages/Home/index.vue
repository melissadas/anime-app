<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import debounce from 'lodash.debounce'
import SearchBar from '../../components/SearchBar/index.vue'
import AnimeCard from '../../components/AnimeCard/index.vue'
import AnimeDetailModal from '../../components/AnimeDetailModal/index.vue'
import { useSearchAnime } from '../../queries/useSearchAnime'
import type { Anime } from '../../types/anime'

const searchTerm = ref('')
const searchInput = ref('')

const route = useRoute()
const router = useRouter()

const selectedAnimeId = ref<number | null>(null)

const hasStartedTyping = computed(() => searchInput.value.trim().length > 0)

const onSearchInput = (query: string) => {
    searchInput.value = query
    debouncedSearch(query)
}

const debouncedSearch = debounce((query: string) => {
    searchTerm.value = query
}, 300)

// Watch the router to open modal if URL has /anime/:id
watch(
    () => route.params.id,
    (id) => {
        if (id) {
            selectedAnimeId.value = Number(id)
        } else {
            selectedAnimeId.value = null
        }
    },
    { immediate: true }
)


const openAnimeDetail = (anime: Anime) => {
    router.push({ name: 'AnimeDetailModal', params: { id: anime.id } })
}

const closeAnimeDetail = () => {
    router.push({ name: 'Home' })
}

const { animeList, loading, error, loadMore } = useSearchAnime(searchTerm)
</script>

<template>
    <v-container class="home-container pt-20" fluid>
        <div :class="['sticky-search-bar-wrapper', { 'search-active': hasStartedTyping }]">
            <v-row justify="center" align="center" class="mt-2">
                <v-col cols="12" md="8" lg="6">
                    <SearchBar @search="onSearchInput" />
                </v-col>
            </v-row>
        </div>

        <v-row justify="center" class="mt-4" v-if="hasStartedTyping">
            <p class="text-subtitle-1 text-center">
                Showing results for: <strong>{{ searchInput }}</strong>
            </p>
        </v-row>

        <v-row v-if="animeList.length" dense class="my-8 px-16">
            <v-col v-for="anime in animeList" :key="anime.id" cols="12" sm="4" md="3" lg="2" class="pa-2">
                <AnimeCard :anime="anime" @click="openAnimeDetail(anime)" />
            </v-col>
        </v-row>

        <v-row justify="center" v-if="animeList.length && !loading" class="mt-0">
            <v-btn class="mt-8" color="outlined" @click="loadMore">
                See more
            </v-btn>
        </v-row>

        <v-row justify="center" v-if="loading">
            <v-progress-circular indeterminate color="primary" class="mt-8" />
        </v-row>

        <v-row justify="center" v-if="error">
            <p class="text-subtitle-1 text-center">
                Oops! Something went wrong. Try searching again.
            </p>
        </v-row>

        <AnimeDetailModal v-if="selectedAnimeId" :anime-id="selectedAnimeId" @close="closeAnimeDetail" />
    </v-container>
</template>


<style scoped>
.home-container {
    min-height: 90vh;
}

.sticky-search-bar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 50vh;
    padding-top: 120px;
    transition: all 0.5s ease;
}

.sticky-search-bar-wrapper.search-active {
    min-height: auto;
    padding: 16px 0;
}
</style>
