<template>
  <div>
    <VMenu ref="vmRef" style="margin: 0 auto; display: block" :data="base" :readonly="true"></VMenu>
    <n-form class="mt-4" label-placement="left" label-width="auto">
      <n-form-item label="名称">
        <n-input v-model:value="values.name"></n-input>
      </n-form-item>
      <n-form-item label="头像">
        <n-input v-model:value="values.icon"></n-input>
      </n-form-item>
      <n-form-item label="圆角">
        <n-switch v-model:value="values.padding"></n-switch>
      </n-form-item>
      <n-form-item label="描述">
        <n-input v-model:value="values.desc"></n-input>
      </n-form-item>
      <n-form-item label="链接">
        <n-input v-model:value="values.url"></n-input>
      </n-form-item>
      <n-form-item path="url" label="序号">
        <n-input-number style="width: 100%" v-model:value="values.sort" clearable />
      </n-form-item>
    </n-form>
    <teleport to="#footer">
      <n-button type="primary" size="small" @click="addIssue">添加</n-button>
    </teleport>
  </div>
</template>
<script setup lang="ts">
import type { IVMenu } from '@/types';
import request from '@/tools/fetch';
import VMenu from '@/components/VMenu';
const edit = defineEmits(['success', 'cancel']);
const props = defineProps(['data']);
const base = ref(props.data.base);
const values: any = ref<IVMenu>({
  name: '',
  icon: '',
  desc: '',
  url: '',
  sort: 999,
  padding: true,
});
const rules={};
const vmRef: any = ref(null);
watchEffect(() => {
  if (values.value.icon && vmRef.value) {
    vmRef.value.updateIcon(values.value);
  }
});

const addIssue = () => {
  let list = Object.keys(values.value);
  let params: any = {};
  list.map((item) => {
    params[`${item}`] = values.value[item];
  });
  let paramsStr = `\`\`\`json\r\n${JSON.stringify(params, null, 2)}\r\n\`\`\``;
  return request(`POST /repos/{owner}/{repo}/issues/{issue_number}/comments`, {
    owner: 'chendj89',
    repo: 'data',
    issue_number: base.value.number,
    body: JSON.stringify({ body: paramsStr }),
  })
    .then((res) => res.json())
    .then((data) => {
      edit('success', { reload: true });
    });
};
onMounted(() => {
  // console.log(vmRef);
});
</script>
<style lang="scss" scoped></style>
