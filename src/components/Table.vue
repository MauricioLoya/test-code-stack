<script setup lang="ts" generic="T">
import { computed, reactive, watch } from 'vue'

interface TableProps {
  rows: T[]
  totalRows: number
  isLoaded: boolean
}
interface PaginationOptions {
  page: number
  perPage: number
}
const paginationOptions = reactive<PaginationOptions>({
  perPage: 10,
  page: 1
})
const props = withDefaults(defineProps<TableProps>(), {})

const pagesCount = computed(() =>
  Math.ceil(props.totalRows / paginationOptions.perPage)
)
watch(
  () => paginationOptions.perPage,
  () => {
    if (paginationOptions.page > pagesCount.value) {
      paginationOptions.page = pagesCount.value
    }
  }
)
const emit = defineEmits<{
  (event: 'changePagination', pagination: PaginationOptions): void
}>()

function onSelectLimit() {
  emit('changePagination', paginationOptions)
}

function onChangePage() {
  emit('changePagination', paginationOptions)
}
</script>

<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:bg-gray-800 bg-gray-200"
      >
        <thead
          class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <slot name="thead"></slot>
          </tr>
        </thead>
        <tbody>
          <tr v-if="props.isLoaded" v-for=" in paginationOptions.perPage">
            <td
              class="px-4 py-3 text-center text-gray-500 dark:text-gray-400"
              colspan="100%"
            >
              <div
                class="h-5 bg-gray-100 rounded-full dark:bg-gray-700 mb-2.5"
              ></div>
            </td>
          </tr>
          <tr
            v-if="props?.rows?.length > 0"
            v-for="(row, index) in props.rows"
            :key="index"
            class="border-b border-gray-50
             dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <slot name="cols" :item="row" :i="index" />
          </tr>
          <tr v-if="props?.rows?.length == 0 && !isLoaded">
            <td
              class="px-4 py-3 text-center text-gray-500 dark:text-gray-400"
              colspan="100%"
            >
              <div class="flex items-center justify-center flex-col gap-6 p-10">
                <img
                  src="../assets/no-data.svg"
                  class="h-56"
                  alt="No data found"
                />
                <p class="text-xl">No data found</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav
      class="flex flex-col md:flex-row items-center md:justify-between pt-4 px-2 mb-6 gap-4"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Per page:
        <select
          class="p-0.5 w-16 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          @change="onSelectLimit"
          v-model="paginationOptions.perPage"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </span>

      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        <button
          @click="
            () => {
              paginationOptions.page > 1 &&
                paginationOptions.page-- &&
                onChangePage()
            }
          "
        >
          &lt; Prev
        </button>
        <span class="mx-4">
          <span> Page: </span>
          <select
            v-model="paginationOptions.page"
            @change="onChangePage"
            class="p-0.5 w-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option v-for="page in pagesCount" :value="page" :key="page">
              {{ page }}
            </option>
          </select>
          / of {{ pagesCount }}
        </span>
        <button
          @click="
            () => {
              paginationOptions.page < pagesCount &&
                paginationOptions.page++ &&
                onChangePage()
            }
          "
        >
          Next &gt;
        </button>
      </span>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Total rows: {{ props.totalRows ?? 0 }}
      </span>
    </nav>
  </div>
</template>
