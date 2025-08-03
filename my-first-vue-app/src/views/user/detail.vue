<template>
  <div class="user-detail">
    <h1>用户详情页</h1>
    
    <div class="user-info">
      <div class="info-card">
        <h2>基本信息</h2>
        <p><strong>用户ID </strong>{{ route.params.id }}</p>
        <p><strong>姓名：</strong>{{ userData.name }}</p>
        <p><strong>年龄：</strong>{{ userData.age }}</p>
      </div>
      
      <div class="route-info">
        <h3>路由信息</h3>
        <p><strong>完整路径：</strong>{{ route.fullPath }}</p>
        <p><strong>路由参数：</strong>{{ JSON.stringify(route.params) }}</p>
        <p><strong>查询参数：</strong>{{ JSON.stringify(route.query) }}</p>
      </div>
    </div>
    
    <div class="demo-links">
      <h3>试试其他用户：</h3>
      <router-link to="/user/detail/1" class="demo-link">用户1</router-link>
      <router-link to="/user/detail/2" class="demo-link">用户2</router-link>
      <router-link to="/user/detail/3?tab=profile" class="demo-link">用户3(带查询参数)</router-link>
    </div>
    
    <div class="navigation">
      <button @click="goBack" class="btn">返回上一页</button>
      <router-link to="/" class="btn">回到首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 模拟用户数据库
const userDatabase = {
  1: { name: '张0006666666666三', age: 25 },
  2: { name: '李四', age: 30 },
  3: { name: '王五', age: 28 }
}

// 根据路由参数获取用户数据
const userData = computed(() => {
  const userId = route.params.id
  return userDatabase[userId] || { name: '未知用户', age: '未知' }
})

// 监听路由变化 - 同一个组件，不同参数时会复用组件
watch(() => route.params.id, (newId) => {
  console.log('用户ID变化了：', newId)
  // 这里可以重新加载数据
})

function goBack() {
  router.back()
}

// 组件创建时输出当前路由信息
console.log('UserDetail组件加载，用户ID：', route.params.id)
</script>

<style scoped>
.user-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.user-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.info-card, .route-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.info-card h2, .route-info h3 {
  color: #42b883;
  margin-top: 0;
}

.demo-links {
  margin: 30px 0;
  text-align: center;
}

.demo-link {
  display: inline-block;
  margin: 0 10px;
  padding: 10px 15px;
  background-color: #007acc;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.demo-link:hover {
  background-color: #005a9e;
}

.navigation {
  text-align: center;
  margin-top: 30px;
}

.btn {
  display: inline-block;
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #369870;
}

@media (max-width: 768px) {
  .user-info {
    grid-template-columns: 1fr;
  }
}
</style>