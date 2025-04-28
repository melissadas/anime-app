<script setup lang="ts">
import type { Anime } from '../../types/anime'

const props = defineProps<{
  anime: Anime,
}>()
</script>

<template>
  <div class="anime-card-wrapper" @click="$emit('click')">
    <v-card elevation="2" class="anime-card h-100 d-flex flex-column mx-2" @click="$emit('click')">
      <div class="fade-wrapper">
        <div class="image-wrapper">
          <v-img :src="props.anime.coverImage.large" :alt="props.anime.title.romaji" height="300px" cover />
        </div>
      </div>
    </v-card>

    <div class="anime-title mt-2">
      {{ props.anime.title.romaji }}
    </div>
  </div>
</template>

<style scoped>
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
  display: flex;
  flex-direction: column;
  /* align-items: center; */
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

.fade-wrapper {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.5s ease forwards;
}

.image-wrapper {
  position: relative;
  height: 300px;
}

.skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.anime-title {
  color: white;
  font-weight: 600;
  font-size: 1rem;
  max-width: 200px;
  word-wrap: break-word;
  text-align: left;
}
</style>
