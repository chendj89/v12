<template>
  <div style="padding: 20px">
    <n-spin :show="loading">
      <VMenu4 v-for="(item, index) in vmList" :key="index" :auth="auth" style="margin: 0 10px 10px" :base="item" @reload="init"></VMenu4>
    </n-spin>
    <VBar></VBar>
  </div>
</template>

<script setup lang="ts">
import VMenu4 from '@/components/VMenu4';
import VBar from '@/components/VBar';
import { formatComment } from '@/tools/format';
import { getIssue } from '@/tools/issues';
const auth: any = ref(false);
const loading = ref(false);

auth.value = Boolean(localStorage.getItem('auth') !== null);
const vmList: any = ref([]);
const g_data: any = inject('g_data');

/**
 * 获取菜单
 */
const init = () => {
  loading.value = true;
  getIssue().then(async (data) => {
    vmList.value = [];
    loading.value = false;
    g_data.value.top = 0;
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let content = formatComment(item.body);
      g_data.value.top += Number(content.top || 0);
      vmList.value.push({
        ...content,
        number: item.number,
        comments_url: item.comments_url,
      });
      await sleep(500);
    }
  });
};
init();
async function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

</script>

<style scoped></style>
