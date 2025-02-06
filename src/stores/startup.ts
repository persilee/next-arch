import { type List } from '~/schema/startup'
import qs from 'qs'
import { pagination } from '@nuxt/ui/dist/runtime/ui.config'
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
    pagination: {
      page: 1,
      pageSize: 25,
    },
    filter: {},
  })
  const total = ref<number>()

  const keyword = ref<string>('')

  watch(keyword, (value) => {
    if (!value) {
      params.value.filter = {}
    }

    if (value && value.length >= 2) {
      params.value.filter = {
        $or: [
          {
            name: {
              '∋': `'${value}'`,
            },
          },
          {
            oneline: {
              '∋': `'${value}'`,
            },
          },
          {
            industry: {
              '∋': `'${value}'`,
            },
          },
        ],
      }
    }
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
  const setTotal = (data: string | number | null) => {
    if (data) {
      total.value = parseInt(`${data}`, 10)
    }
  }
  const read = async () => {
    const { data } = await useFetch(`/api/console/startups${queries.value}`, {
      onResponse({ response }) {
        setTotal(response.headers.get('x-total-count'))
      },
    })

    list.value = data.value || []
  }

  /**
   * 返回值
   */
  return { list, read, params, total, keyword }
})
