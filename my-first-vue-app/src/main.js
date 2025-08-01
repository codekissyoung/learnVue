// 入口文件
import { createApp } from 'vue'  // 从vue包导入createApp函数
import { createPinia } from 'pinia'  // 导入Pinia状态管理
import App from './App.vue'      // 导入根组件
import router from './router/index.js'    // 导入路由配置

const app = createApp(App)       // 创建Vue应用实例
const pinia = createPinia()      // 创建Pinia实例

app.use(router)                  // 使用路由
app.use(pinia)                   // 使用Pinia状态管理
app.mount('#app')                // 挂载到#app元素上
