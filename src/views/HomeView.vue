<template>
  <div style="padding: 20px">
    <n-spin :show="loading">
      <VMenu4 v-for="(item, index) in vmList" :key="index" :auth="auth" style="margin: 0 10px 10px" :base="item" @reload="init"></VMenu4>
    </n-spin>
    <VBar @init="init"></VBar>
  </div>
</template>

<script setup lang="ts">
import VMenu4 from '@/components/VMenu4';
import VBar from '@/components/VBar';
import { formatComment } from '@/tools/format';
import { getIssue } from '@/tools/issues';
import request from '@/tools/fetch';
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
  auth.value = Boolean(localStorage.getItem('auth') !== null);
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
      await sleep(100);
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

// /**
//  * 获取菜单
//  */
//   const getIssue = () => {
//   return request('GET /repos/{owner}/{repo}/issues?sort=created&direction=asc&labels=menu', {
//     owner: 'chendj89',
//     repo: 'data',
//   }).then((res) => res.json());
// };

function translation() {
  request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'chendj89',
    repo: 'translation',
    path: 'src/en/list.ts',
  })
    .then((res) => res.json())
    .then((data) => {
      // updateList(data.sha);
      // fetch('https://raw.githubusercontent.com/chendj89/translation/main/package.json')
      //   .then((res) => res.json())
      //   .then((res) => {
      //     console.log(res);
      //   });
    });
}
translation();

function updateList(sha: string) {
  const content =  [
    {
      name: 'proto',
      type: [''],
      key: [],
      feature: [],
    },
  ];
  request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'chendj89',
    repo: 'translation',
    path: 'src/en/list.ts',
    body: JSON.stringify({
      message: '添加单词proto',
      content: btoa(`${JSON.stringify(content)}`),
      sha: sha,
    }),
  });
}
</script>

<style scoped></style>
