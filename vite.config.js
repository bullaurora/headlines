import { createVuePlugin } from 'vite-plugin-vue2'
import vitePluginImp from 'vite-plugin-imp'
import path, { resolve } from 'path'
function _resolve(dir) {
  return path.resolve(__dirname, dir)
}
export default {
  plugins: [
    createVuePlugin(),
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
