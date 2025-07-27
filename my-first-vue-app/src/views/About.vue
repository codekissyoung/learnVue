<template>
  <div class="about">
    <h1>关于页面</h1>
    <p>这里演示Vue Router的路由跳转功能</p>
    
    <div class="route-info">
      <h2>当前路由信息：</h2>
      <p><strong>路径：</strong>{{ $route.path }}</p>
      <p><strong>名称：</strong>{{ $route.name }}</p>
      <p><strong>完整路径：</strong>{{ $route.fullPath }}</p>
    </div>
    
    <div class="navigation">
      <router-link to="/" class="nav-link">返回首页</router-link>
      <router-link to="/counter" class="nav-link">去计数器</router-link>
    </div>
    
    <div class="demo">
      <h2>编程式导航演示：</h2>
      <button @click="goHome" class="btn">通过代码跳转到首页</button>
      <button @click="goBack" class="btn">返回上一页</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

// useRouter: 获取路由器实例，用于编程式导航
const router = useRouter()
// useRoute: 获取当前路由信息
const route = useRoute()

function goHome() {
  // 编程式导航 - 通过代码跳转路由
  router.push('/')
}

function goBack() {
  // 返回上一页
  router.back()
}

console.log('About页面组件已加载，当前路由：', route.path)
</script>

<style scoped>
.about {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.route-info {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
}

.navigation {
  margin: 20px 0;
}

.nav-link {
  display: inline-block;
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #369870;
}

.demo {
  margin-top: 30px;
}

.btn {
  margin: 0 10px;
  padding: 10px 15px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #005a9e;
}
</style>