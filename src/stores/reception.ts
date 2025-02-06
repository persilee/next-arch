/**
 * ReceptionStore
 */
export const useReceptionStore = defineStore('reception', () => {
  /**
   * State 🌴
   */
  const input = ref({
    name: '',
    password: '',
  })

  /**
   * Getters 🌵
   */
  const signupInput = computed(() => {
    return {
      name: input.value.name,
      password: input.value.password,
    }
  })

  /**
   * Actions 🚀
   */
  const signup = async () => {
    try {
      await $fetch(`/api/reception/signup`, {
        method: 'POST',
        body: signupInput.value,
      })

      useToast().add({ title: '注册成功' })
    } catch (error) {}
  }

  /**
   * 返回值
   */
  return {
    input,
    signup,
  }
})
