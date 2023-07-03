<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <Table
      @changePagination="onChangePaginationTable"
      :rows="usersStore.users"
      :totalRows="usersStore.metaData.paginationTotal"
      :isLoaded="usersStore.isFetchingUsers"
    >
      <template #thead>
        <th scope="col" class="px-6 py-3">
          <div class="flex flex-col">
            User
            <input
              @input="onTypeSearch"
              v-model="filters.name"
              placeholder="Search by name"
              type="search"
              class="rounded-md text-xs p-1 bg-gray-200 dark:bg-gray-600 w-48"
            />
          </div>
        </th>
        <th scope="col" class="px-6 py-3">
          <div class="flex flex-col">
            Email
            <input
              @input="onTypeSearch"
              v-model="filters.email"
              placeholder="Search by email"
              type="search"
              class="rounded-md text-xs p-1 bg-gray-200 dark:bg-gray-600 w-48"
            />
          </div>
        </th>
        <th scope="col" class="px-6 py-3 text-center">
          <div class="flex flex-col">
            Gander
            <select
              v-model="filters.gender"
              @change="updateUserList"
              class="rounded-md text-xs p-1 bg-gray-200 dark:bg-gray-600"
            >
              <option :value="undefined">ALL</option>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
            </select>
          </div>
        </th>
        <th scope="col" class="px-6 py-3 text-center">Action</th>
      </template>
      <template #cols="{ item }">
        <th class="p-2">
          <Avatar :name="item.name" />
          {{ item.name }}
        </th>
        <th class="p-2">
          <Text>
            {{ item.email }}
          </Text>
        </th>
        <th class="p-2">
          <div class="flex justify-center items-center uppercase">
            {{ item.gender }}
          </div>
        </th>
        <th class="p-2">
          <div class="flex text-xs justify-center items-center uppercase">
            <RouterLink :to="{ name: 'user-details', params: { id: item.id } }">
              See details
            </RouterLink>
          </div>
        </th>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useUsersStore } from './useUsersStore'
import Table from '../../components/Table.vue'
import Avatar from '../../components/Avatar.vue'
import Text from '../../components/Text.vue'

const usersStore = useUsersStore()
let timer: number | undefined = undefined
const pagination = reactive({
  page: 1,
  perPage: 10
})
const filters = reactive({
  name: undefined,
  email: undefined,
  gender: undefined,
  onlyActive: true
})

function onChangePaginationTable(paginationOptions: {
  perPage: number
  page: number
}) {
  pagination.page = paginationOptions.page
  pagination.perPage = paginationOptions.perPage
  updateUserList()
}

function updateUserList() {
  usersStore.fetchUsers(pagination, filters)
}

function onTypeSearch() {
  clearTimeout(timer)
  timer = setTimeout(updateUserList, 500)
}

onMounted(() => {
  usersStore.fetchUsers(
    {
      page: pagination.page,
      perPage: pagination.perPage
    },
    filters
  )
})
</script>
