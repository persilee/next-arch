<script setup lang="ts">
const message = ref('')
const sendMessage = () => {
  useSocket().send(message.value)
  message.value = ''
}
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center px-6">
    <div class="w-full md:w-[560px]">
      <form @submit.prevent="sendMessage">
        <div class="flex gap-2">
          <UInput
            v-model="message"
            placeholder="请输入消息"
            size="xl"
            :ui="{ wrapper: 'flex-1' }"
          />
          <UButton label="发送" @click="sendMessage" />
        </div>
      </form>
    </div>
  </div>
</template>
