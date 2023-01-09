<template>
  <div>
    <n-spin :show="loading">
      <n-form ref="nfRef" :model="values" :rules="rules" class="mt-4" label-placement="left" label-width="auto">
        <n-form-item label="密码" path="pwd">
          <n-input v-model:value="values.pwd"></n-input>
        </n-form-item>
      </n-form>
      <teleport to="#footer">
        <n-button type="primary" size="small" @click="success">确定</n-button>
      </teleport>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
const values: any = ref<any>({
  pwd: '',
});
const rules = {
  pwd: {
    required: true,
    message: '请输入',
    trigger: ['blur', 'change'],
  },
};
const edit = defineEmits(['success', 'cancel']);
const loading = ref(false);
const nfRef: any = ref(null);
const success = () => {
  if (loading.value) {
    return;
  }
  nfRef.value?.validate((errors: any) => {
    if (!errors) {
      localStorage.setItem('pwd', values.value.pwd);
      edit('success', { reload: true, msg: '登录成功' });
    } else {
    }
  });
};
</script>

<style scoped></style>
