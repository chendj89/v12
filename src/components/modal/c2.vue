<template>
  <div>
    <n-spin :show="loading">
      <VMenu2 ref="vmRef" type="add" :data="props.data"></VMenu2>
      <n-form ref="nfRef" :model="values" :rules="rules" class="mt-4" label-placement="left" label-width="auto">
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
        <n-button type="primary" size="small" @click="create">确定</n-button>
      </teleport>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import VMenu2 from '@/components/VMenu2';
import request from '@/tools/fetch';
const props = defineProps(['data']);
const edit = defineEmits(['success', 'cancel']);
const values: any = ref<any>({
  name: '',
  icon: '',
  desc: '',
  url: '',
  sort: 999,
  padding: true,
});
const rules = {
  name: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
  icon: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
  desc: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
};
const vmRef: any = ref(null);
const nfRef: any = ref(null);
const loading = ref(false);
watch(values.value, () => {
  vmRef.value?.updateAdd(values.value);
});

const create = () => {
  if(loading.value){
    return;
  }
  nfRef.value?.validate((errors: any) => {
    if (!errors) {
      loading.value = true;
      const keys = Object.keys(values.value);
      let body: any = {};
      keys.map((item) => {
        body[`${item}`] = values.value[item];
      });
      let str = `\`\`\`json\r\n${JSON.stringify(body, null, 2)}\r\n\`\`\``;
      request(`POST /repos/{owner}/{repo}/issues/{issue_number}/comments`, {
        owner: 'chendj89',
        repo: 'data',
        auth:true,
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
