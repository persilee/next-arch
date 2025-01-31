export const useConsoleStore = defineStore(
  'console',
  () => {
    /**
     * State
     */
    const title = ref('控制台')

    /**
     * Getters
     */
    const emojiTitle = computed(() => {
      return `${title.value} 🐍`
    })

    /**
     * Actions
     */

    const setTitle = (data: string) => {
      throw createError('Error')
      // title.value = data
    }

    return { title, emojiTitle, setTitle }
  },
  {
    notifyOnError: ['setTitle'],
  },
)
