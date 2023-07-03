<script setup lang="ts">
import TheNavBar from './components/TheNavBar.vue'
</script>

<template>
  <main class="bg-white dark:bg-gray-900 h-full min-h-screen">
    <TheNavBar />
    <section class="mx-auto max-w-7xl md:px-6 lg:px-8">
      <routerView />
    </section>
  </main>
</template>
