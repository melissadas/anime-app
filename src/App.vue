<template>
  <!-- Main app layout -->
  <v-app>
    <v-app-bar app flat color="#a464cf" elevation="0" class="px-6 pt-2">
      <v-toolbar-title class="text-h6 font-weight-bold" aria-label="Title of the app">
        Anime Explorer
      </v-toolbar-title>
    </v-app-bar>

    <v-main class="pt-10">
      <router-view />
    </v-main>
  </v-app>
</template>