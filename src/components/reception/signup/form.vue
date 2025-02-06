<script setup lang="ts">
const store = useReceptionStore()
</script>

<template>
  <form class="space-y-4">
    <ReceptionFormIdentifierInput scene="signup" v-model="store.input.name" />
    <ReceptionFormPasswordInput v-model="store.input.password" />
    <div class="py-4">
      <ReceptionElementButton label="注册" @click="store.signup">
        <template #description>
          <div class="text-center">
            <UButton
              @click.stop
              label="已有账户，直接登录"
              variant="link"
              color="white"
              size="xs"
              trailingIcon="i-solar-arrow-right-linear"
              to="/reception/signin"
            ></UButton>
          </div>
        </template>
      </ReceptionElementButton>
    </div>
  </form>
</template>
