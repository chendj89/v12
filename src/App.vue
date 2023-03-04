<script setup lang="ts">
const g_data: any = ref({
  bar: null,
  top: 0,
  menu: {},
  delMenuItem: (item: any) => {
    if (g_data.value.menu[item.id]) {
      delete g_data.value.menu[item.id];
    }
  },
});
provide('g_data', g_data);
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
html,body,#app {
  height: 100%;
}
</style>
