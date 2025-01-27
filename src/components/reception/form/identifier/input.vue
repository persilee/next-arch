<script setup lang="ts">
type Props = { scene: 'signin' | 'signup' }

const { scene } = defineProps<Props>()

const signinMethod = useState('signinMethod', () => 'password')

const signinMethodChangeMessage = (method: string) => {
  const toast = useToast()
  const id = 'signin-method-changed'
  toast.remove(id)

  let title, description

  if (method === 'password') {
    title = '通过密码登录'
    description = '请输入密码登录'
  }

  if (method === 'verification') {
    title = '通过验证码登录'
    description = '请输入验证码登录'
  }

  const message = {
    id,
    title,
    description,
  }

  toast.add(message)
}

const onClickPassword = () => {
  signinMethodChangeMessage('password')
  signinMethod.value = 'password'
}

const onClickVerification = () => {
  signinMethodChangeMessage('verification')
  signinMethod.value = 'verification'
}

const placeholder = computed(() => {
  let value

  if (scene === 'signin' && signinMethod.value === 'password') {
    value = '用户名、邮箱、手机号'
  }

  if (scene === 'signin' && signinMethod.value === 'verification') {
    value = '邮箱、手机号'
  }

  if (scene === 'signup') {
    value = '用户名'
  }

  return value
})
</script>

<template>
  <UInput class="!ring-0" autocomplete="on" :placeholder="placeholder" size="lg">
    <template #trailing>
      <div class="flex gap-2 items-center">
        <UTooltip text="使用密码登录" :ui="{ ring: 'ring-0' }" v-if="scene === 'signin'">
          <UButton
            class="pointer-events-auto"
            icon="i-ri-lock-fill"
            size="2xs"
            variant="soft"
            padded
            @click="onClickPassword"
          />
        </UTooltip>
        <UTooltip
          text="使用验证码登录"
          :ui="{ ring: 'ring-0' }"
          v-if="scene === 'signin'"
        >
          <UButton
            class="pointer-events-auto"
            icon="i-ri-message-3-fill"
            size="2xs"
            variant="soft"
            padded
            @click="onClickVerification"
          />
        </UTooltip>
      </div>
    </template>
  </UInput>
</template>
