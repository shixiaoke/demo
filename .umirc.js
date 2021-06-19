import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  alias: {
    '@': resolve(__dirname, 'src'),
    '@components': resolve(__dirname, 'src/components'),
    '@static': resolve(__dirname, 'src/static'),
    '@utils': resolve(__dirname, 'src/utils'),
    '@page': resolve(__dirname, 'src/pages'),
  },
  fastRefresh: {},
});
