<template>
  <div class="user-layout">
    <div class="sidebar">
      <h2>用户列表</h2>
      <div class="user-list">
        <router-link 
          v-for="user in userList" 
          :key="user.id"
          :to="`/user/detail/${user.id}`"
          class="user-item"
          :class="{ active: $route.params.id == user.id }"
        >
          <div class="user-avatar">{{ user.name.charAt(0) }}</div>
          <div class="user-info">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-age">{{ user.age }}岁</div>
          </div>
        </router-link>
      </div>
      
      <div class="sidebar-footer">
        <router-link to="/" class="back-link">← 返回首页</router-link>
      </div>
    </div>
    
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 用户列表数据
const userList = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 },
  { id: 4, name: '赵六', age: 35 },
  { id: 5, name: '钱七', age: 22 }
])
</script>

<style scoped>
.user-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.sidebar {
  width: 300px;
  background-color: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  padding: 20px;
  margin: 0;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fafafa;
}

.user-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  text-decoration: none;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.user-item:hover {
  background-color: #f8f9fa;
}

.user-item.active {
  background-color: #e3f2fd;
  border-right: 3px solid #2196f3;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.user-age {
  font-size: 14px;
  color: #666;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #fafafa;
}

.back-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
}

.back-link:hover {
  color: #42b883;
}

.content {
  flex: 1;
  overflow-y: auto;
  background-color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-layout {
    flex-direction: column;
    height: auto;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
  }
  
  .user-list {
    max-height: 200px;
  }
}
</style>