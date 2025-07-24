// 这是Vue应用的入口文件
import { createApp } from 'vue'  // 从vue包导入createApp函数
import App from './App.vue'      // 导入根组件

// 创建Vue应用实例并挂载到#app元素上
createApp(App).mount('#app')

// 对比传统方式：
// 传统: document.getElementById('app').innerHTML = '...'
// Vue 3: 数据驱动，自动更新DOM