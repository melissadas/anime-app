<script lang="ts" setup>
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()
</script>

<template>
  <v-text-field v-model="searchQuery" label="Start typing to search for anime" @input="emit('search', searchQuery)"
    prepend-inner-icon="mdi-magnify" variant="outlined" clearable single-line hide-details density="comfortable"
    class="search-input" data-testid="search-bar" />
</template>

<style scoped>
.search-input :deep(.v-field--focused),
.search-input :deep(.v-field:hover) {
  --v-theme-primary: #a464cf;
}
</style>
