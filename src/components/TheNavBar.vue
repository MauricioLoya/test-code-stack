<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Text from './Text.vue'

const isDark = ref(false)

function checkTheme() {
  if (localStorage.getItem('theme')) {
    isDark.value = localStorage.getItem('theme') === 'dark'
  } else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = true
    }
  }
  isDark.value ? setDarkMode() : setLightMode()
}
function setLightMode() {
  document.documentElement.classList.remove('dark')
  document.documentElement.classList.add('light')
  localStorage.setItem('theme', 'light')
}
function setDarkMode() {
  document.documentElement.classList.remove('light')
  document.documentElement.classList.add('dark')
  localStorage.setItem('theme', 'dark')
}
function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    setLightMode()
  } else {
    setDarkMode()
  }
}

onMounted(() => {
  checkTheme()
})
</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4"
    >
      <RouterLink
        :to="{ name: 'users' }"
        href="https://flowbite.com"
        class="flex items-center"
      >
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >
          User List
        </span>
      </RouterLink>
      <div class="flex items-center gap-4">
        <span class="flex justify-center items-start gap-3 mt-4">
          <Text> <i class="fa fa-sun-o" aria-hidden="true"></i> </Text>
          <label class="relative inline-flex items-center mb-4 cursor-pointer">
            <input
              v-model="isDark"
              @change="toggleTheme"
              type="checkbox"
              value=""
              class="sr-only peer"
            />
            <div
              class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
          </label>
          <Text> <i class="fa fa-moon-o" aria-hidden="true"></i> </Text>
        </span>
        <a
          href="https://github.com/MauricioLoya"
          target="_blank"
          class="mr-6 text-sm text-gray-500 dark:text-white hover:underline"
        >
          <i class="fa fa-github" aria-hidden="true"></i>
          MauricioLoya
        </a>
      </div>
    </div>
  </nav>
</template>
