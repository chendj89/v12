<template>
  <div style="padding: 50px;height:100%;background: #f1f3f5;">
    <nConfigProvider :hljs="hljs">
      <NGrid x-gap="12" :cols="4">
        <n-gi>
          <NCard :content-style="cardStyle">
            <nSpace justify="space-between">
              <div :style="codeStyle">ctrl+k, ctrl+0</div>
              <div :style="codeStyle2">折叠所有代码</div>
            </nSpace>
          </NCard>
          <NCard :content-style="cardStyle" style="margin-top: -1px">
            <nSpace justify="space-between">
              <div :style="codeStyle">ctrl+k, ctrl+j</div>
              <div :style="codeStyle2">展开所有代码</div>
            </nSpace>
          </NCard>
        </n-gi>
      </NGrid>
    </nConfigProvider>
  </div>
</template>

<script lang="ts" setup>
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
const cardStyle = `padding:8px 10px;`;
const codeStyle = `
padding:0 8px;
background:#f8f9fa;
border-radius:3px;
height:28px;
line-height:28px;
color: #345;
`;
const codeStyle2 = `
height:28px;
line-height:28px;
color: #345;
`;
hljs.registerLanguage('javascript', javascript);
</script>

<style lang="scss" scoped></style>
