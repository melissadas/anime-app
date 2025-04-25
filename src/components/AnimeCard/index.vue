<script setup lang="ts">
import type { Anime } from '../../types/anime'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  anime: Anime
}>()
const router = useRouter()
//const imageLoaded = ref<boolean>(false)

// const handleImageLoad = () => {
//   imageLoaded.value = true
// }

const goToDetail = () => {
  router.push({ name: 'AnimeDetail', params: { id: props.anime.id } })
}

//TODO: move to utils
const formatDate = (date?: Anime['startDate']) => {
  if (!date || !date.year) return 'N/A'
  const { year, month, day } = date
  return `${day ?? '??'}/${month ?? '??'}/${year}`
}
</script>

<template>
    <v-card elevation="2" class="h-100 d-flex flex-column">
      <div class="position-relative" @click="goToDetail" style="cursor: pointer">
      <!-- <v-skeleton-loader
        v-if="!imageLoaded"
        type="image"
        max-height="300px"
      /> -->

      <v-img
        :src="props.anime.coverImage.large"
        :alt="props.anime.title.romaji"
        height="300px"
        cover
      />
    </div>

    <div class="card-header d-flex justify-space-between align-center px-4 pt-3">
      <h3 class="text-h6 mb-0" style="cursor: pointer" @click="goToDetail">
        {{ props.anime.title.romaji }}
      </h3>
      <div />
    </div>

      <!-- <v-card-subtitle>
        Score: {{ anime.averageScore ?? 'N/A' }} |
        Aired: {{ formatDate(anime.startDate) }}
      </v-card-subtitle>

      <v-card-text>
        <div v-html="anime.description?.slice(0, 200) + '...'"></div>
      </v-card-text> -->
    </v-card>
</template>

<style scoped>
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
