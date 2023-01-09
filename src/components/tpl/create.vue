<template>
  <div>
    <n-spin :show="loading">
      <VMenu4 ref="vmRef" type="create"></VMenu4>
      <n-form ref="nfRef" :model="values" :rules="baseRules" class="mt-4" label-placement="left" label-width="auto">
        <n-form-item label="名称" path="name">
          <n-input v-model:value="values.name"></n-input>
        </n-form-item>
        <n-form-item label="头像" path="icon">
          <n-input v-model:value="values.icon"></n-input>
        </n-form-item>
        <n-form-item label="描述" path="desc">
          <n-input v-model:value="values.desc"></n-input>
        </n-form-item>
      </n-form>
    </n-spin>
    <teleport to="#header">
      <div>新建菜单</div>
    </teleport>
    <teleport to="#footer">
      <n-button type="primary" size="small" @click="create">新建</n-button>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import VMenu4 from '@/components/VMenu4';
import request from '@/tools/fetch';
import { baseRaw, baseKeys, baseRules } from '@/tools/raw';
const valuesRaw=JSON.parse(JSON.stringify(baseRaw))
const values: any = ref<any>(valuesRaw);
const edit = defineEmits(['success', 'cancel']);
const loading = ref(false);
const vmRef: any = ref(null);
const nfRef: any = ref(null);
watch(values.value, () => {
  vmRef.value?.updateBase(values.value);
});
const create = () => {
  if (loading.value) {
    return;
  }
  nfRef.value?.validate((errors: any) => {
    if (!errors) {
      loading.value = true;
      let body: any = {};
      baseKeys.map((item) => {
        body[`${item}`] = values.value[item];
      });
      let str = `\`\`\`json\r\n${JSON.stringify(body, null, 2)}\r\n\`\`\``;
      request(`POST /repos/{owner}/{repo}/issues`, {
        owner: 'chendj89',
        repo: 'data',
        body: JSON.stringify({
          title: values.value.name,
          body: str,
          labels: ['menu'],
        }),
      }).then((res) => {
        loading.value = false;
        if (res.status === 201) {
          edit('success', { reload: true, msg: '新建成功' });
        }
      });
    } else {
    }
  });
};
</script>

<style scoped></style>
