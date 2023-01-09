<template>
  <div>
    <n-spin :show="loading">
      <VMenu2 ref="vmRef" type="create"></VMenu2>
      <n-form ref="nfRef" :model="values" :rules="rules" class="mt-4" label-placement="left" label-width="auto">
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
      <teleport to="#footer">
        <n-button type="primary" size="small" @click="create">保持</n-button>
      </teleport>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import VMenu2 from '@/components/VMenu2';
import request from '@/tools/fetch';
const props = defineProps(['data']);
const values: any = ref<any>({
  name: '',
  icon: '',
  desc: '',
  list: [],
});
values.value = props.data;
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
const edit = defineEmits(['success', 'cancel']);
const loading = ref(false);
const vmRef: any = ref(null);
const nfRef: any = ref(null);
watch(values.value, () => {
  vmRef.value?.updateBase(values.value);
});
onMounted(() => {
  vmRef.value?.updateBase(values.value);
});

const create = () => {
  if (loading.value) {
    return;
  }
  nfRef.value?.validate((errors: any) => {
    if (!errors) {
      loading.value = true;
      const keys = ['name', 'icon', 'desc', 'list'];
      let body: any = {};
      keys.map((item) => {
        body[`${item}`] = values.value[item];
      });
      let str = `\`\`\`json\r\n${JSON.stringify(body, null, 2)}\r\n\`\`\``;
      request(`PATCH /repos/{owner}/{repo}/issues/{issue_number}`, {
        owner: 'chendj89',
        repo: 'data',
        auth:true,
        issue_number: values.value.number,
        body: JSON.stringify({
          title: values.value.name,
          body: str,
          labels: ['menu'],
        }),
      }).then((res) => {
        loading.value = false;
        edit('success', { reload: true, msg: '修改成功' });
      });
    } else {
    }
  });
};
</script>

<style scoped></style>
