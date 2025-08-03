import { createApp } from 'vue'  
import { createPinia } from 'pinia'  
import ElementPlus from 'element-plus'  // 导入Element Plus
import 'element-plus/dist/index.css'    // 导入Element Plus样式

import App from './App.vue'               // 导入根组件
import router from './router/index.js'    // 导入路由配置

const app = createApp(App)       // 创建Vue实例
const pinia = createPinia()      // 创建Pinia实例

app.use(router)                  // 使用路由
app.use(pinia)                   // 使用Pinia状态管理
app.use(ElementPlus)             // 使用Element Plus
app.mount('#app')                // 挂载到#app元素上
