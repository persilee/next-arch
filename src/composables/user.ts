import { useStorage } from '@vueuse/core'

export type CurrentUser = {
  id: string
  name: string
  token: string
}

/**
 * 使用当前用户的组合函数。
 *
 * @param {CurrentUser | null} data - 当前用户的数据，如果为 null 则表示没有用户。
 * @returns {{ currentUser: Ref<CurrentUser | null> }} 返回一个包含当前用户状态的对象。
 *
 * @remarks
 * 该函数会根据传入的数据更新当前用户的状态，并将其存储在本地存储中。
 * 如果传入的数据为 null，则会清除当前用户的状态和本地存储中的数据。
 */
export const useCurrentUser = (data?: CurrentUser | null) => {
  const key = 'currentUser'

  const defaults = {
    id: '',
    name: '',
    token: '',
  }

  const currentUserFromStorage = useStorage<CurrentUser>(key, defaults)
  const currentUser = useState<CurrentUser | null>(key)

  if (currentUserFromStorage.value.token) {
    currentUser.value = currentUserFromStorage.value
  }

  if (data) {
    currentUser.value = data
    currentUserFromStorage.value = data
  }

  if (data === null) {
    currentUser.value = null
    currentUserFromStorage.value = null
  }

  return { currentUser }
}
