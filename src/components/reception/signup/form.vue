<script setup lang="ts"></script>

<template>
  <form class="space-y-4">
    <div class="py-4">
      <ReceptionElementButton label="注册">
        <template #description>
          <div class="text-center">
            <UButton
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
