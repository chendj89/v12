<script setup lang="ts">
import VMenu2 from '@/components/VMenu2';
import request from '@/tools/fetch';
import formatBody from '@/tools/formatBody';
import useDialog from '@/tools/useDialog';
import c1 from '@/components/modal/c1.vue';
import auth from '@/components/modal/auth.vue';
const ins = getCurrentInstance();
const issueList = ref([]);
const loading = ref(false);
const loaded = ref(false);
const getIssue = async () => {
  loading.value = true;
  let issues: any = await request('GET /repos/{owner}/{repo}/issues?sort=created&direction=asc&labels=menu', {
    owner: 'chendj89',
    repo: 'data',
    auth:true,
  }).then((res) => res.json());
  loading.value = false;
  issueList.value = issues.map((item: any) => {
    return {
      id: item.id,
      number: item.number,
      comments_url: item.comments_url,
      ...formatBody(item.body).code,
    };
  });
};
const createIssue = () => {
  useDialog({
    com: c1,
    ins: ins,
    data: {},
    title: '新建菜单',
  }).then((res: any) => {
    if (res && res.reload) {
      getIssue();
    }
  });
};
const reload = () => {
  getIssue();
};
const login = () => {
  useDialog({
    ins: ins,
    com: auth,
    title: '登录',
    data: {},
  }).then((res: any) => {
    if (res.reload) {
      loaded.value = true;
      getIssue();
    }
  });
};
onMounted(() => {
  const pwd = localStorage.getItem('pwd');
  if (pwd) {
    loaded.value = true;
  
  }
  getIssue();
  // getIssue();
});
</script>

<template>
  <div style="padding: 20px">
    <n-spin :show="loading">
      <VMenu2 style="margin: 0 10px 10px" v-for="item in issueList" :key="item.id" :data="item" @reload="reload"></VMenu2>
    </n-spin>
    <n-button style="margin: 0 10px 10px" @click="createIssue">创建</n-button>
    <n-button v-if="!loaded" style="margin: 0 10px 10px" @click="login">登录</n-button>
  </div>
</template>
