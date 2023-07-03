<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUsersStore } from './useUsersStore'
import NotFound from '../../components/NotFound.vue'
import { useRoute } from 'vue-router'
import Text from '../../components/Text.vue'
const showError = ref(false)
const usersStore = useUsersStore()
const route = useRoute()

async function getUserDetails(): Promise<void> {
  try {
    await usersStore.fetchUserById(parseInt(route.params.id.toString()))
  } catch (error) {
    console.log('error on get users details', error)
    showError.value = true
  }
}

onMounted(() => {
  getUserDetails()
})
</script>

<template>
  <section v-if="!showError">
    <nav class="flex mb-10" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <router-link
            :to="{ name: 'users' }"
            href="#"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            User list
          </router-link>
        </li>
        <li>
          <div class="flex items-center">
            <Text> > </Text>
            <span
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
            >
              Details
            </span>
          </div>
        </li>
      </ol>
    </nav>
    <div class="shadow-md p-5 rounded-lg dark:bg-gray-800 bg-gray-50">
      <div class="px-4 sm:px-0">
        <h3
          class="text-lg text-gray-700 uppercase dark:text-gray-400 font-bold"
        >
          User Information
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and posts.
        </p>
      </div>
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              class="text-md font-bold leading-6 text-gray-700 dark:text-gray-400"
            >
              ID
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-200"
            >
              {{ usersStore.currentUser?.user?.id }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              class="text-md font-bold leading-6 text-gray-700 dark:text-gray-400"
            >
              Full name
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-200"
            >
              {{ usersStore.currentUser?.user?.name }}
            </dd>
          </div>

          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              class="text-md font-bold leading-6 text-gray-700 dark:text-gray-400"
            >
              Email address
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:text-gray-200"
            >
              {{ usersStore.currentUser?.user?.email }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              class="text-md font-bold leading-6 text-gray-700 dark:text-gray-400"
            >
              Gender
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 uppercase dark:text-gray-200"
            >
              {{ usersStore.currentUser?.user?.gender }}
            </dd>
          </div>

          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              class="text-md font-bold leading-6 text-gray-700 dark:text-gray-400"
            >
              Posts
            </dt>
            <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                class="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li
                  v-if="usersStore.currentUser?.posts.length > 0"
                  v-for="(post, index) in usersStore.currentUser?.posts"
                  :key="post.id"
                  class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                >
                  <div class="flex w-0 flex-1 items-center">
                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                      <span class="flex-shrink-0 text-gray-400">
                        {{ index + 1 }}.
                      </span>
                      <span class="truncate font-medium dark:text-gray-200">
                        {{ post.title }}
                      </span>
                    </div>
                  </div>
                </li>
                <li
                  v-else
                  class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                >
                  <div class="flex w-0 flex-1 items-center">
                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                      <span class="flex-shrink-0 text-gray-400">
                        This user has no posts.
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
  <NotFound v-else />
</template>
