<template>
  <div>
    <n-spin :show="loading">
      <VMenu4 ref="vmRef" type="add" :base="props.data"></VMenu4>
      <n-form ref="nfRef" :model="values" :rules="menuRules" class="mt-4" label-placement="left" label-width="auto">
        <n-form-item label="名称">
          <n-input v-model:value="values.name"></n-input>
        </n-form-item>
        <n-form-item label="头像">
          <n-input v-model:value="values.icon"></n-input>
        </n-form-item>
        <n-form-item label="圆角">
          <n-switch v-model:value="values.padding"></n-switch>
        </n-form-item>
        <n-form-item label="菜单">
          <n-switch v-model:value="values.top"></n-switch>
        </n-form-item>
        <n-form-item label="描述">
          <n-input v-model:value="values.desc"></n-input>
        </n-form-item>
        <n-form-item label="链接">
          <n-input v-model:value="values.url"></n-input>
        </n-form-item>
        <n-form-item path="sort" label="序号">
          <n-input-number min="1" style="width: 100%" v-model:value="values.sort" clearable />
        </n-form-item>
      </n-form>
    </n-spin>
    <teleport to="#header">
      <div>添加菜单</div>
    </teleport>
    <teleport to="#footer">
      <n-button type="primary" size="small" @click="create">确定</n-button>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import VMenu4 from '@/components/VMenu4';
import request from '@/tools/fetch';
import { menuRaw, menuKeys, menuRules } from '@/tools/raw';
const props = defineProps(['data']);
const edit = defineEmits(['success', 'cancel']);
const valuesRaw = JSON.parse(JSON.stringify(menuRaw));
const values: any = ref<any>(valuesRaw);
values.value.sort = props.data.raw.length;
const vmRef: any = ref(null);
const nfRef: any = ref(null);
const loading = ref(false);
watch(values.value, () => {
  if (values.value && values.value.icon) {
    vmRef.value?.updateAdd(values.value);
  }
});
const create = () => {
  if (loading.value) {
    return;
  }
  nfRef.value?.validate((errors: any) => {
    if (!errors) {
      loading.value = true;
      let body: any = {};
      menuKeys.map((item) => {
        body[`${item}`] = values.value[item];
      });
      let str = `\`\`\`json\r\n${JSON.stringify(body, null, 2)}\r\n\`\`\``;
      request(`POST /repos/{owner}/{repo}/issues/{issue_number}/comments`, {
        owner: 'chendj89',
        repo: 'data',
        issue_number: props.data.number,
        body: JSON.stringify({
          body: str,
        }),
      }).then((res) => {
        loading.value = false;
        if (res.status === 201) {
          edit('success', { reload: true, msg: '新增成功' });
        }
      });
    } else {
    }
  });
};
</script>

<style scoped></style>
