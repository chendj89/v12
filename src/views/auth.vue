<template>
  <div style="padding:20px">
    <n-switch v-model:value="auth" @update:value="handleChange" />
  </div>
</template>

<script setup lang="ts">
const auth = ref(false);
const handleChange = (value: boolean) => {
  localStorage.setItem('auth', value.toString());
};
</script>

<style scoped></style>
