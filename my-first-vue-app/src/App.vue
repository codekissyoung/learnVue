<template>
  <div class="app">
    <header>
      <!-- Title部分 - 可以隐藏 -->
      <div class="title-section" :class="{ 'title-hidden': isScrolled }">
        <h1>{{ title }}</h1>
      </div>
      
      <!-- 导航栏部分 - 始终固定 -->
      <nav class="navbar">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/about" class="nav-item">关于</router-link>
        <router-link to="/counter" class="nav-item">计数器</router-link>
        <router-link to="/global-counter" class="nav-item">全局计数器</router-link>
        <router-link to="/user/detail/1" class="nav-item">用户详情</router-link>
        <router-link to="/reactivity-demo" class="nav-item">响应式演示</router-link>
        <router-link to="/api-demo" class="nav-item">API演示</router-link>
        <router-link to="/hooks-demo" class="nav-item">Hooks演示</router-link>
      </nav>
    </header>
    
    <!-- 路由视图 - 这里会显示当前路由对应的组件 -->
    <main :style="{ marginTop: isScrolled ? '60px' : '120px' }">
      <router-view />
    </main>

    <footer>
      <p>© 2023 Vue 3学习项目</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const title = ref('Vue 3 学习项目')
const isScrolled = ref(false)

// 滚动监听函数
const handleScroll = () => {
  // 当滚动距离超过50px时隐藏title
  isScrolled.value = window.scrollY > 50
}

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.title-section {
  padding: 20px 0 10px 0;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: 100px;
  display: flex;
  justify-content: center;
}

.title-section h1 {
  max-width: 1200px;
  width: 100%;
  margin: 0;
  padding-left: 20px;
  text-align: left;
  color: #42b883;
}

.title-section.title-hidden {
  max-height: 0;
  padding: 0;
  opacity: 0;
}

.navbar {
  background-color: #f8f9fa;
  padding: 10px 0;
  border-top: 1px solid #e9ecef;
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
  flex: 1;
  transition: margin-top 0.3s ease;
}

footer {
  background-color: #f8f9fa;
  text-align: center;
  padding: 20px 0;
  margin-top: auto;
  border-top: 1px solid #e9ecef;
}

footer p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>