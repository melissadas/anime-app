<script setup lang="ts">
/**
 * AnimeCard
 * 
 * Renders a card displaying anime cover and title.
 * 
 * Props:
 * - anime: Anime - the anime object to display
 * 
 * Emits:
 * - click - when the card is clicked
 */
import { ref } from 'vue'
import type { Anime } from '../../types/anime'

const props = defineProps<{
  anime: Anime,
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const isImageLoaded = ref(false)

const handleImageLoad = () => {
  isImageLoaded.value = true
}
</script>

<template>
  <div class="anime-card-wrapper d-flex flex-column" @click="emit('click')">
    <v-card elevation="2" class="anime-card h-100 d-flex flex-column mx-2">
      <div class="image-wrapper">
        <v-img :src="props.anime.coverImage.large" :alt="props.anime.title.romaji" height="500px" cover
          @load="handleImageLoad" class="image" />
      </div>

      <v-skeleton-loader v-if="!isImageLoaded" type="image" height="300" class="skeleton-overlay" />
    </v-card>

    <div class="anime-title mt-2 text-left font-weight-medium" v-if="isImageLoaded">
      {{ props.anime.title.romaji }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}



.anime-card-wrapper {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.anime-card {
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
}

.anime-card-wrapper:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

.image-wrapper {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.5s ease forwards;
  position: relative;
  height: 300px;
}

.image {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.skeleton-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.anime-title {
  color: white;
  font-size: 1rem;
  max-width: 200px;
  word-wrap: break-word;
}
</style>
