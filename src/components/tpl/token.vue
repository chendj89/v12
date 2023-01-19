<template>
  <div>
    <n-spin :show="loading">
      <n-tabs animated justify-content="space-evenly" type="bar" pane-style="padding: 10px" v-model:value="values.tab">
        <n-tab-pane name="login" tab="登录">
          <div>
            <div>
              <n-input v-model:value="values.pwd" type="password" maxlength="8"></n-input>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="auth" tab="凭证">
          <n-input v-model:value="values.auth"></n-input>
        </n-tab-pane>
      </n-tabs>
    </n-spin>
    <teleport to="#header">
      <div>添加凭证</div>
    </teleport>
    <teleport to="#footer">
      <n-button type="primary" size="small" @click="success">确定</n-button>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import request from '@/tools/fetch';
import { getComment } from '@/tools/issues';
const props = defineProps(['data']);
const edit = defineEmits(['success', 'cancel']);
const loading = ref(false);
const values = ref({
  pwd: '',
  auth: '',
  tab: 'login',
});
const success = () => {
  if (values.value.tab == 'auth') {
    if (values.value.auth) {
      let list: any[] = values.value.auth.split('');
      list = list.map((code) => {
        return code.charCodeAt(0);
      });
      const auth = list.join(',');
      loading.value = true;
      request(`POST /repos/{owner}/{repo}/issues/{issue_number}/comments`, {
        owner: 'chendj89',
        repo: 'auth',
        issue_number: 1,
        auth: values.value.auth,
        body: JSON.stringify({
          body: auth,
        }),
      }).then((res) => {
        loading.value = false;
        if (res.status === 201) {
          edit('success', { reload: true, msg: '新增成功' });
        }
      });
    }
  } else {
    const base = '55,55,55,55,55,55,55,55';
    if (values.value.pwd) {
      const pwd = values.value.pwd
        .split('')
        .map((item) => item.charCodeAt(0))
        .toString();
      if (base !== pwd) {
        values.value.pwd = '';
        return;
      }
      loading.value = true;
      request('get https://api.github.com/repos/chendj89/auth/issues/1/comments')
        .then((res) => res.json())
        .then((data) => {
          loading.value = false;
          if (data && data.length) {
            const lastComment = data[data.length - 1].body;
            const auth = lastComment
              .split(',')
              .map((code: any) => String.fromCharCode(code))
              .join('');
            localStorage.setItem('auth', auth);
            edit('success', { reload: true, msg: '登录成功' });
          }
        });
    }
  }
};
</script>

<style scoped></style>
