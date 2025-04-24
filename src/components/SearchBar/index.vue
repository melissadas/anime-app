<template>
    <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="searchQuery"
      label="Search Anime"
      prepend-inner-icon="mdi-magnify"
      clearable
    />
    <v-btn type="submit" color="primary">Search</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

function handleSubmit() {
  const trimmed = searchQuery.value.trim()
  if (trimmed) emit('search', trimmed)
}
</script>
