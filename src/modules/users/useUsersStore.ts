import { defineStore } from 'pinia'
import { Post, UserItem } from '../../types'
import { ref } from 'vue'
import axios from 'axios'
import { API_URL } from '../../config/values'

export const useUsersStore = defineStore('useUsersStore', () => {
  const users = ref<UserItem[]>([])
  const currentUser = ref<{ user: UserItem | undefined; posts: Post[] }>({
    user: undefined,
    posts: []
  })
  const metaData = ref<{
    paginationTotal: number
  }>({ paginationTotal: 0 })
  const isFetchingUsers = ref(false)

  interface PaginationOptions {
    perPage: number
    page: number
  }

  async function fetchUsers(
    options: PaginationOptions,
    filterOptions?: {
      name?: string
      email?: string
      onlyActive?: boolean
      gender?: 'female' | 'male' | undefined | ''
    }
  ): Promise<UserItem[] | void> {
    try {
      isFetchingUsers.value = true
      users.value = []
      const response = await axios.get(`${API_URL}/users`, {
        params: {
          per_page: options.perPage ?? 10,
          page: options.page ?? 1,
          status: filterOptions?.onlyActive ? 'active' : '',
          name: filterOptions?.name,
          email: filterOptions?.email,
          gender: filterOptions?.gender
        }
      })
      if (response.headers['x-pagination-total']) {
        metaData.value.paginationTotal = parseInt(
          response.headers['x-pagination-total']?.toString() ?? '0'
        )
      }
      users.value = response.data
    } catch (error) {
      throw error
    } finally {
      isFetchingUsers.value = false
    }
  }

  async function fetchUserById(id: number): Promise<UserItem | void> {
    try {
      const [userResponse, postsResponse] = await Promise.all([
        axios.get(`${API_URL}/users/${id}`),
        axios.get(`${API_URL}/users/${id}/posts`)
      ])
      currentUser.value.user = userResponse.data
      currentUser.value.posts = postsResponse.data
    } catch (error) {
      throw error
    }
  }

  return {
    users,
    fetchUsers,
    metaData,
    isFetchingUsers,
    currentUser,
    fetchUserById
  }
})
