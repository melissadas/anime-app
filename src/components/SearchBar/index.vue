<script lang="ts" setup>
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()
</script>

<template>
    <v-text-field
      v-model="searchQuery"
      label="Start typing to search for anime"
      @input="emit('search', searchQuery)"
      prepend-inner-icon="mdi-magnify"
      clearable
      outlined
      hide-details
      density="comfortable"
    />
</template>

<style scoped>
</style>
