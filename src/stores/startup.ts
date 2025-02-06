import { type List } from '~/schema/startup'
import qs from 'qs'
/**
 * StartupStore
 */
export const useStartupStore = defineStore('startup', () => {
  /**
   * State 🌴
   */
  const list = ref<List>([])
  const params = ref({
    sort: {
      field: 'created',
      order: 'asc',
    },
  })

  /**
   * Getters 🌵
   */
  const queries = computed(() => {
    return qs.stringify(params.value, {
      skipNulls: true,
      addQueryPrefix: true,
    })
  })

  /**
   * Actions 🚀
   */
  const read = async () => {
    const { data } = await useFetch(`/api/console/startups${queries.value}`)

    list.value = data.value || []
  }

  /**
   * 返回值
   */
  return { list, read }
})
