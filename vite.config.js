import { createVuePlugin } from 'vite-plugin-vue2'
import vitePluginImp from 'vite-plugin-imp'
import eslintPlugin from 'vite-plugin-eslint'
import  { resolve } from 'path'

export default {
  plugins: [
    createVuePlugin(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    vitePluginImp({
      //组件按需导入
      libList: [
        {
          libName: 'vant',
          style(name) {
            return `vant/es/${name}/style/index`
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: '@ASS',
        replacement: resolve(__dirname, 'src/assets'),
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "@ASS/css/theme.less";`,
        },
      },
    },
  },
}
