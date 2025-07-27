# Vue Router 4 完整教程

## 🎯 什么是Vue Router？

想象一下传统的网站：
- 点击"关于我们" → 浏览器发请求 → 服务器返回about.html → 整个页面刷新
- 点击"产品页面" → 浏览器发请求 → 服务器返回product.html → 又是整个页面刷新

Vue Router让我们可以创建**单页应用(SPA)**：
- 点击"关于我们" → JavaScript处理 → 只切换页面内容 → 无刷新，体验流畅
- 点击"产品页面" → JavaScript处理 → 只切换页面内容 → 还是无刷新

就像手机App一样，点击底部标签，只是内容区域在变化，不会整个App重新加载。

## 🔍 核心概念详解

### 1. 路由(Route) = URL + 组件
```javascript
{
  path: '/about',        // 浏览器地址栏显示的路径
  name: 'About',         // 路由的名字，方便代码中引用
  component: About       // 显示哪个Vue组件
}
```

**理解要点**：
- `path`是用户在浏览器看到的URL路径
- `component`是当用户访问这个路径时要显示的Vue组件
- 就像"钥匙对应锁"，URL路径对应Vue组件

### 2. 路由器(Router) = 管理员
```javascript
const router = createRouter({
  history: createWebHistory(),  // 历史记录模式
  routes: [...]                // 所有路由配置
})
```

**Router的工作**：
1. 监听URL变化
2. 根据URL找到对应的组件
3. 在`<router-view>`位置显示组件
4. 管理浏览器的前进/后退按钮

### 3. router-view = 内容显示区域
```vue
<template>
  <div>
    <nav>导航栏固定在这里</nav>
    <router-view />  <!-- 这里的内容会根据URL变化 -->
    <footer>页脚也固定在这里</footer>
  </div>
</template>
```

**类比理解**：
- `<router-view>`就像电视屏幕
- 不同的路由就像不同的电视频道
- 切换路由就像切换频道，屏幕内容变了，但电视机还是同一台

## 🛠️ 实际代码解析

### 步骤1：安装Vue Router
```bash
npm install vue-router@4
```

### 步骤2：创建路由配置文件
**文件位置**：`src/router/index.js`

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// 路由配置数组 - 告诉Vue Router哪个URL对应哪个组件
const routes = [
  {
    path: '/',              // 根路径，即网站首页
    name: 'Home',           // 路由名称
    component: Home         // 显示Home组件
  },
  {
    path: '/about',         // /about路径
    name: 'About',          // 路由名称
    component: About        // 显示About组件
  },
  {
    path: '/counter',       // /counter路径
    name: 'Counter',
    // 懒加载：只有访问时才加载组件，优化性能
    component: () => import('../Counter.vue')
  }
]

// 创建路由器实例
const router = createRouter({
  // 使用HTML5历史模式，URL看起来像：/about 而不是 /#/about
  history: createWebHistory(),
  routes: routes  // 传入路由配置
})

export default router
```

**关键理解**：
- 静态导入 vs 懒加载：前者页面加载时就导入，后者访问时才导入
- `createWebHistory()`让URL看起来更"正常"

### 步骤3：在main.js中注册路由器
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'     // 导入路由器

createApp(App)
  .use(router)                    // 告诉Vue应用使用这个路由器
  .mount('#app')
```

**理解要点**：
- `.use(router)`让整个Vue应用都能使用路由功能
- 就像给汽车安装GPS导航系统

### 步骤4：在App.vue中使用路由
```vue
<template>
  <div class="app">
    <header>
      <h1>我的网站</h1>
      
      <!-- 导航菜单 -->
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link to="/counter">计数器</router-link>
      </nav>
    </header>
    
    <!-- 页面内容显示区域 - 这里会根据URL显示不同组件 -->
    <main>
      <router-view />
    </main>
  </div>
</template>
```

**关键概念**：
- `<router-link to="/about">` → 创建链接，点击时跳转到/about
- `<router-view />` → 显示当前URL对应的组件内容

## 🧭 两种导航方式详解

### 1. 声明式导航 - router-link
**在模板中使用**：
```vue
<template>
  <!-- 最简单的用法 -->
  <router-link to="/about">关于我们</router-link>
  
  <!-- 带样式类 -->
  <router-link to="/contact" class="nav-button">联系我们</router-link>
  
  <!-- 传递查询参数 -->
  <router-link to="/products?category=electronics">电子产品</router-link>
</template>
```

**特点**：
- Vue Router会自动给当前页面的链接添加`router-link-active`类
- 可以用CSS设置当前页面链接的高亮样式

### 2. 编程式导航 - 在JavaScript中跳转
```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 跳转到指定页面
function goToAbout() {
  router.push('/about')
}

// 跳转并传递参数
function goToUser(userId) {
  router.push(`/user/${userId}`)
}

// 返回上一页
function goBack() {
  router.back()
}

// 前进到下一页
function goForward() {
  router.forward()
}
</script>

<template>
  <button @click="goToAbout">去关于页面</button>
  <button @click="goBack">返回上一页</button>
</template>
```

**使用场景**：
- 表单提交后跳转
- 登录成功后跳转到首页
- 根据条件决定跳转到哪个页面

## 📍 获取路由信息

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// 在模板中可以直接使用 $route
</script>

<template>
  <div>
    <p>当前路径：{{ route.path }}</p>
    <p>路由名称：{{ route.name }}</p>
    <p>完整URL：{{ route.fullPath }}</p>
    
    <!-- 或者使用 $route -->
    <p>当前路径：{{ $route.path }}</p>
  </div>
</template>
```

## 🎨 样式和用户体验

### 活跃链接样式
```css
/* Vue Router自动添加的类 */
.router-link-active {
  background-color: #42b883;
  color: white;
  font-weight: bold;
}

/* 或者自定义导航样式 */
.nav-item {
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s;
}

.nav-item:hover {
  background-color: #f0f0f0;
}

.nav-item.router-link-active {
  background-color: #42b883;
  color: white;
}
```

## 🌟 实际开发中的最佳实践

### 1. 页面组件放在views文件夹
```
src/
├── views/          # 页面级组件
│   ├── Home.vue
│   ├── About.vue
│   └── Contact.vue
├── components/     # 可复用的小组件
│   ├── Header.vue
│   └── Footer.vue
└── router/
    └── index.js
```

### 2. 路由懒加载优化性能
```javascript
const routes = [
  {
    path: '/',
    component: Home  // 首页立即加载
  },
  {
    path: '/about',
    // 其他页面懒加载，访问时才下载
    component: () => import('../views/About.vue')
  }
]
```

### 3. 路由命名便于维护
```javascript
// 好的做法：给路由命名
{
  path: '/user/profile',
  name: 'UserProfile',
  component: UserProfile
}

// 在代码中使用名称跳转
router.push({ name: 'UserProfile' })
```

## 🔄 工作流程总结

1. **用户操作**：点击链接或调用router.push()
2. **路由匹配**：Vue Router根据URL在routes数组中查找匹配的路由
3. **组件加载**：找到匹配的组件（如果是懒加载则现在下载）
4. **视图更新**：在`<router-view>`位置显示新组件
5. **URL更新**：浏览器地址栏更新，但页面不刷新
6. **历史记录**：浏览器的前进/后退按钮正常工作

## 💡 关键优势

### 与传统网站对比：

**传统多页面网站**：
```
首页.html → 点击"关于" → 服务器请求 → 关于.html → 整页刷新
```

**Vue Router单页应用**：
```
App.vue → 点击"关于" → JavaScript处理 → 显示About组件 → 无刷新
```

**优势**：
- ✅ 用户体验流畅，无白屏闪烁
- ✅ 减少服务器请求，节省带宽
- ✅ 可以保持页面状态（如音乐继续播放）
- ✅ 更像原生App的体验

## 🎓 学习检验

完成Vue Router学习后，你应该能回答：

1. **概念理解**：什么是SPA？Vue Router解决了什么问题？
2. **配置能力**：如何创建路由配置？如何在项目中集成？
3. **导航实现**：router-link和router.push()有什么区别？
4. **信息获取**：如何在组件中获取当前路由信息？
5. **实际应用**：如何规划一个真实项目的路由结构？

## 🚀 实战练习建议

1. **基础练习**：为我们的项目添加更多页面（联系我们、产品列表等）
2. **样式练习**：美化导航栏，实现响应式设计
3. **功能练习**：添加面包屑导航，显示当前页面路径
4. **综合练习**：开发一个多页面的Todo应用

---

**记住**：Vue Router的核心就是"URL路径 ↔ Vue组件"的映射关系！掌握了这个概念，其他都是在这个基础上的扩展。

现在你可以去 http://localhost:5174/ 体验我们刚创建的项目，感受单页应用的魅力！

*Vue Router教程完成 - 2024-07-27*