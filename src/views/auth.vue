<template>
  <div id="el">

  </div>
</template>

<script setup lang="ts">
import { runCode } from './c1';
onMounted(()=>{
  runCode();
})
</script>

<style lang="scss" scoped>
#el {
  position: relative;
  width: 300px;
  height: 200px;
  background: #edf3f8;
  overflow: hidden;
}
</style>
