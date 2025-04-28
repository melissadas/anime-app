<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ref, computed, watch } from 'vue'
import type { Anime } from '../../types/anime'
import { GET_ANIME_BY_ID } from '../../queries/getAnimeById'
import { formatDate } from '../../utils/formatDate'

const props = defineProps<{
  animeId: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { result, loading } = useQuery<{ Media: Anime }>(GET_ANIME_BY_ID, { id: props.animeId })
const anime = computed(() => result.value?.Media)

const internalOpen = ref(true)

watch(internalOpen, (val) => {
  if (!val) emit('close')
})

const handleClose = () => {
  internalOpen.value = false
}
</script>

<template>
  <v-dialog v-model="internalOpen" max-width="800px" max-height="80vh" opacity="0.4">
    <v-card v-if="anime" class="anime-detail-modal">
      <div class="background-image" :style="{ backgroundImage: `url(${anime.coverImage.large})` }">
        <v-btn icon class="close-button position-absolute top-0 right-0 ma-2 text-white" @click="handleClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="overlay-gradient"></div>
      </div>

      <div class="text-section pa-6 text-white">
        <h2 class="text-h5 font-weight-bold mb-2">{{ anime.title.romaji }}
          <v-chip color="#a464cf" text-color="white">
            Score:{{ anime.averageScore ?? 'N/A' }}
          </v-chip>
        </h2>
        <p class="text-subtitle-2 font-weight-medium mb-4">{{ formatDate(anime.startDate) }}</p>
        <v-card-text class="anime-description mt-3">
          <div v-html="anime.description || 'No description available.'"></div>
        </v-card-text>
      </div>
    </v-card>

    <v-progress-linear v-else-if="loading" indeterminate color="#a464cf" />

    <v-card v-else class="py-8 text-center d-flex align-center justify-center">
      <p>Anime not found or failed to load.</p>
      <v-btn icon @click="handleClose" color="#a464cf" class="mt-2">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.anime-detail-modal {
  overflow: hidden;
  background-color: #181818;
  min-height: 500px;
}

.background-image {
  position: relative;
  width: 100%;
  height: 450px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 130px;
  background: linear-gradient(to top,
      #181818 0%,
      rgba(24, 24, 24, 0.9) 40%,
      rgba(24, 24, 24, 0.7) 60%,
      rgba(24, 24, 24, 0.4) 80%,
      rgba(24, 24, 24, 0) 100%);
}

.text-section {
  background-color: #181818;
}

.anime-description {
  max-height: 250px;
  overflow-y: auto;
  padding: 0;
}

.close-button {
  z-index: 2;
}
</style>
