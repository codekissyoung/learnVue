<script setup>
import { ref } from 'vue'
const title = ref('Vue 3 + Vue Router + Pinia 学习项目')
</script>

<template>
  <div class="app">
    <header>
      <h1>{{ title }}</h1>
      
      <!-- 导航栏 -->
      <nav class="navbar">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/about" class="nav-item">关于</router-link>
        <router-link to="/counter" class="nav-item">计数器</router-link>
        <router-link to="/global-counter" class="nav-item">全局计数器</router-link>
        <router-link to="/user/detail/1" class="nav-item">用户详情</router-link>
        <router-link to="/reactivity-demo" class="nav-item">响应式演示</router-link>
        <router-link to="/api-demo" class="nav-item">API演示</router-link>
      </nav>
    </header>
    
    <!-- 路由视图 - 这里会显示当前路由对应的组件 -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
.app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

header {
  background-color: #f8f9fa;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  color: #42b883;
  margin: 0 0 20px 0;
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-item {
  text-decoration: none;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s;
  font-weight: 500;
}

.nav-item:hover {
  background-color: #42b883;
  color: white;
}

/* Vue Router 会自动给当前活跃的链接添加这个类 */
.nav-item.router-link-active {
  background-color: #42b883;
  color: white;
}

main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>