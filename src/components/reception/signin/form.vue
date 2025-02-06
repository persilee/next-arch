<script setup lang="ts">
const signinMethod = useState('signinMethod')
const store = useReceptionStore()
</script>

<template>
  <form class="space-y-4">
    <ReceptionFormIdentifierInput scene="signin" v-model="store.input.identifier" />
    <ReceptionFormPasswordInput
      v-if="signinMethod === 'password'"
      withReset
      v-model="store.input.password"
    />
    <ReceptionFormVerificationInput v-if="signinMethod === 'verification'" />
    <div class="py-4">
      <ReceptionElementButton label="登录" @click="store.signin">
        <template #description>
          <div class="text-center">
            <UButton
              @click.stop
              label="还没有账户，创建账户"
              variant="link"
              color="white"
              size="xs"
              trailingIcon="i-solar-arrow-right-linear"
              to="/reception/signup"
            ></UButton>
          </div>
        </template>
      </ReceptionElementButton>
    </div>
  </form>
</template>
