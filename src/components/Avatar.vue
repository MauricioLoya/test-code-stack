<script lang="ts" setup>
import { computed } from 'vue'

interface AvatarProps {
  name: string
}
const props = defineProps<AvatarProps>()
const initials = computed(() => {
  const [first, last] = props.name.split(' ')
  return `${first[0]}${last[0]}`
})
</script>
<template>
  <div
    class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
  >
    <span class="font-medium text-gray-600 dark:text-gray-300">
      {{ initials }}
    </span>
  </div>
</template>
