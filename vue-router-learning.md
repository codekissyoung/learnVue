# Vue Router 4 学习总结
### 1. 安装Vue Router
```bash
npm install vue-router@4
```

### 2. 创建路由配置 (`src/router/index.js`)
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/counter', name: 'Counter', component: () => import('../Counter.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### 3. 在main.js中注册路由
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

## 🏗️ 核心概念

### 1. 路由配置对象
- **path**: URL路径 (如 `/`, `/about`)
- **name**: 路由名称，用于编程式导航
- **component**: 对应的Vue组件

### 2. 两种组件加载方式
- **静态导入**: `import Home from '../views/Home.vue'` - 页面加载时就导入
- **动态导入**: `() => import('../Counter.vue')` - 访问时才导入(懒加载)

### 3. 历史模式
- **createWebHistory()**: HTML5 History模式，URL看起来像正常路径
- **createWebHashHistory()**: Hash模式，URL带#号

## 🧭 导航方式

### 1. 声明式导航 - router-link
```vue
<template>
  <router-link to="/">首页</router-link>
  <router-link to="/about">关于</router-link>
</template>
```

### 2. 编程式导航 - useRouter
```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')        // 跳转到首页
}

function goBack() {
  router.back()           // 返回上一页
}
</script>
```

## 📍 路由信息获取

### useRoute - 获取当前路由信息
```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// 可以访问：
// route.path      - 当前路径
// route.name      - 路由名称
// route.fullPath  - 完整路径
// route.params    - 路由参数
// route.query     - 查询参数
</script>
```

## 🎨 样式和活跃状态

### router-link-active 类
Vue Router会自动给当前活跃的链接添加`router-link-active`类：

```css
.nav-item.router-link-active {
  background-color: #42b883;
  color: white;
}
```

## 📱 项目结构
```
src/
├── router/
│   └── index.js          # 路由配置
├── views/                # 页面组件
│   ├── Home.vue
│   └── About.vue
├── App.vue               # 根组件，包含<router-view>
└── main.js               # 注册路由
```

## 🔄 工作流程

1. **用户点击链接** → router-link捕获点击事件
2. **路由匹配** → Vue Router根据URL匹配对应的路由配置
3. **组件切换** → 在router-view位置显示匹配的组件
4. **URL更新** → 浏览器地址栏更新，但不刷新页面

## 💡 关键优势

### 与传统多页面应用对比：
- **传统方式**: 点击链接 → 服务器请求 → 全页面刷新 → 加载新HTML
- **SPA方式**: 点击链接 → JavaScript处理 → 组件切换 → 无刷新体验

### 性能优势：
- 无页面刷新，用户体验流畅
- 只加载必要的组件代码
- 可以实现路由懒加载，优化首屏加载速度

## 🛠️ 实际应用场景

1. **企业后台管理系统**: 侧边栏菜单 + 内容区域
2. **电商网站**: 首页/产品列表/产品详情/购物车等页面
3. **博客系统**: 文章列表/文章详情/分类页面等
4. **移动端App**: 底部标签栏导航

## 🎓 学习成果

✅ **路由配置**: 掌握routes数组的配置方法  
✅ **导航实现**: 理解router-link和编程式导航  
✅ **路由信息**: 会使用useRoute获取当前路由状态  
✅ **项目集成**: 成功在Vue 3项目中集成Vue Router  
✅ **实际应用**: 创建了包含3个页面的完整路由应用

## 🔜 下一步学习方向

1. **动态路由**: 带参数的路由 `/user/:id`
2. **嵌套路由**: 复杂页面的子路由结构  
3. **路由守卫**: 导航前的权限验证  
4. **路由懒加载**: 优化大型应用的加载性能
5. **与状态管理结合**: Pinia + Vue Router的配合使用

---
*Vue Router学习完成 - 2024-07-27*