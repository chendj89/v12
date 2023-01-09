<template>
  <div>
    <n-spin :show="loading">
      <VMenu4 ref="vmRef" type="edit" :base="baseRaw" @updateMenu="updateMenu"></VMenu4>
      <n-form ref="nfRef" :model="values" :rules="menuRules" class="mt-4" label-placement="left" label-width="auto">
        <n-form-item label="名称" path="name">
          <n-input v-model:value="values.name"></n-input>
        </n-form-item>
        <n-form-item label="头像" path="icon">
          <n-input v-model:value="values.icon"></n-input>
        </n-form-item>
        <n-form-item label="圆角" path="padding">
          <n-switch v-model:value="values.padding"></n-switch>
        </n-form-item>
        <n-form-item label="菜单" path="top">
          <n-switch v-model:value="values.top"></n-switch>
        </n-form-item>
        <n-form-item label="描述" path="desc">
          <n-input v-model:value="values.desc"></n-input>
        </n-form-item>
        <n-form-item label="链接" path="url">
          <n-input v-model:value="values.url"></n-input>
        </n-form-item>
        <n-form-item label="序号" path="sort">
          <n-input-number min="1" style="width: 100%" v-model:value="values.sort" />
        </n-form-item>
      </n-form>
    </n-spin>
    <teleport to="#header">
      <div>编辑菜单</div>
    </teleport>
    <teleport to="#footer">
      <n-button type="error" size="small" @click="del">删除</n-button>
      <n-button type="primary" class="ml-2" size="small" @click="create">确定</n-button>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import VMenu4 from '@/components/VMenu4';
import request from '@/tools/fetch';
import { menuRaw, menuKeys, menuRules } from '@/tools/raw';
const props = defineProps(['data']);
const baseRaw = ref(JSON.parse(JSON.stringify(props.data)));
const edit = defineEmits(['success', 'cancel']);
const valuesRaw = JSON.parse(JSON.stringify(menuRaw));
const values: any = ref<any>(valuesRaw);
const vmRef: any = ref(null);
const nfRef: any = ref(null);
const loading = ref(false);
watch(values.value, () => {
  if (values.value && values.value.icon) {
    vmRef.value?.updateAdd(values.value);
  }
});
const updateMenu = (_value: any) => {
  values.value = _value;
};
const del = () => {
  create('del');
};
onMounted(() => {
  // updateMenu(baseRaw.value.list[0][0])
  vmRef.value.activeMenu(baseRaw.value.list[0][0]);
});
const create = (type: string) => {
  let method = 'PATCH';
  if (type == 'del') {
    method = 'DELETE';
  }
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
      request(`${method} /repos/{owner}/{repo}/issues/comments/{comment_id}`, {
        owner: 'chendj89',
        repo: 'data',
        comment_id: values.value.id,
        body: JSON.stringify({
          body: str,
        }),
      }).then((res) => {
        loading.value = false;
        edit('success', { reload: true, msg: '修改成功', menu: values.value, type: values.value.top });
      });
    } else {
    }
  });
};
</script>

<style scoped></style>
