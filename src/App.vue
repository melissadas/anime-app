<template>
  <v-app>
    <!-- TODO: fix the header since it overlaps with the content on scroll -->
    <v-app-bar app flat color="transparent" elevation="0" class="px-6 pt-2">
      <v-toolbar-title class="text-h6 font-weight-bold">
        Anime Explorer
      </v-toolbar-title>

      <v-spacer />

      <!-- Right-side content placeholder -->
      <div>
        <!-- could be icons, avatar, theme toggle, etc. -->
      </div>
    </v-app-bar>

    <v-main class="pt-10">
      <router-view />
    </v-main>
  </v-app>
</template>