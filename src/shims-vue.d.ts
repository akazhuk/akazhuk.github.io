// src/shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 声明 .vue 文件导出的是一个 Vue 组件类型
  const component: DefineComponent<{}, {}, any>
  export default component
}