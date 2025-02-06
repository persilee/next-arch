<script setup lang="ts">
import type { UInput } from '#components'

const store = useReceptionStore()

const items = ref<Array<string>>(new Array(4).fill(''))
const refs = ref<Array<InstanceType<typeof UInput> | null>>([])

const onInput = (index: number, event: Event) => {
  const { value } = event.target as HTMLInputElement
  items.value[index] = value

  if (value.length === 1) {
    if (index < items.value.length - 1) {
      const nextRef = refs.value[index + 1]
      if (nextRef && 'input' in nextRef && nextRef.input) {
        nextRef.input.focus()
      }
    }
  }
}

const onPaste = (index: number, event: ClipboardEvent) => {
  const clipboardData = event.clipboardData
  if (clipboardData) {
    const text = clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)

    text.split('').forEach((char, i) => {
      if (index + i < items.value.length) {
        items.value[index + i] = char
      }
    })

    refs.value.forEach((item, i) => {
      if (item && 'input' in item) {
        if (i >= index && i < index + text.length) {
          item.input?.focus()
        } else {
          item.input?.blur()
        }
      }
    })
  }
}

const verificationCode = computed(() => {
  return items.value.join('')
})

watch(verificationCode, (value) => {
  store.input.verification = value
})

const send = () => {
  store.verify()
}

const canSubmit = computed(() => {
  return verificationCode.value.length === 4
})

const submit = () => {
  if (canSubmit.value) {
    store.signin()
  } else {
    useToast().add({
      title: '验证码填写有误',
    })
  }
}

const onKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && (event.target as HTMLInputElement).value === '') {
    if (index > 0) {
      const prevRef = refs.value[index - 1]
      if (prevRef && 'input' in prevRef && prevRef.input) {
        prevRef.input.focus()
      }
    }
  }
}
</script>

<template>
  <div class="flex gap-4 justify-between">
    <UInput
      class="!ring-0 !w-9 text-center font-medium"
      maxlength="1"
      size="lg"
      autocomplete="off"
      v-for="(value, index) in items"
      :key="index"
      ref="refs"
      v-model="items[index]"
      @input="onInput(index, $event)"
      @paste="onPaste(index, $event)"
      @keydown="onKeydown(index, $event)"
    />
    <div class="flex gap-3">
      <UButton class="!ring-0" variant="soft" size="xs" label="发送" @click="send" />
      <UButton class="!ring-0" variant="soft" size="xs" label="确认" @click="submit" />
    </div>
  </div>
</template>
