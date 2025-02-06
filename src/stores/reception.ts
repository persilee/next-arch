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
    identifier: '',
    verification: '',
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

  const signinMethod = useState('signinMethod')
  const signinInput = computed(() => {
    if (signinMethod.value === 'password') {
      return {
        identifier: input.value.identifier,
        password: input.value.password,
      }
    }
    if (signinMethod.value === 'verification') {
      return {
        identifier: input.value.identifier,
        verification: input.value.verification,
      }
    }
  })

  const verifyInput = computed(() => {
    return {
      identifier: input.value.identifier,
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
        ...useFetchInterceptor(),
      })

      useToast().add({ title: '注册成功' })
    } catch (error) {}
  }

  const signin = async () => {
    try {
      await $fetch(`/api/reception/signin`, {
        method: 'POST',
        body: signinInput.value,
        ...useFetchInterceptor(),
      })

      useToast().add({ title: '登录成功' })
    } catch (error) {}
  }

  const verify = async () => {
    try {
      await $fetch(`/api/reception/verification`, {
        method: 'POST',
        body: verifyInput.value,
        ...useFetchInterceptor(),
      })

      useToast().add({ title: '验证码发送成功' })
    } catch (error) {}
  }

  /**
   * 返回值
   */
  return {
    input,
    signup,
    signin,
    verify,
  }
})
