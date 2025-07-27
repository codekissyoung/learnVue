// 入口文件
import { createApp } from 'vue'  // 从vue包导入createApp函数
import App from './App.vue'      // 导入根组件
import router from './router'    // 导入路由配置
createApp(App).use(router).mount('#app')  // 创建Vue应用实例，使用路由，并挂载到#app元素上
