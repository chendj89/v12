import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

//三方插件
// 样式
import Unocss from 'unocss/vite';
// 图标
import Icons from 'unplugin-icons/vite';
// 自动导入组件-sfc
import Components from 'unplugin-vue-components/vite';
// naiveUi自动导入组件-sfc
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
// 自动导入引用
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV == 'development' ? '/' : '/v12/',
  plugins: [
    vue(),
    vueJsx(),
    Unocss(),
    Icons({ autoInstall: true }),
    Components({
      dts: true,
      resolvers: [NaiveUiResolver()],
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': ['NCard', 'NThing'],
        },
      ],
      defaultExportByFilename: true,
      dirs: ['./components/**'],
      dts: './auto-imports.d.ts',
      vueTemplate: false,
      resolvers: [],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
