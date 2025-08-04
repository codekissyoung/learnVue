<template>
  <div class="user-list-content">
    <div class="welcome-section">
      <h1>用户管理系统</h1>
      <p class="description">欢迎来到用户管理系统！请在左侧选择一个用户查看详细信息。</p>
    </div>
    
    <div class="feature-cards">
      <div class="feature-card">
        <div class="feature-icon">👥</div>
        <h3>用户列表</h3>
        <p>左侧显示所有用户，点击可查看详情</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">📝</div>
        <h3>详细信息</h3>
        <p>查看用户的基本信息和路由参数</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🔗</div>
        <h3>嵌套路由</h3>
        <p>演示Vue Router嵌套路由功能</p>
      </div>
    </div>
    
    <div class="quick-actions">
      <h3>快速开始</h3>
      <div class="action-buttons">
        <router-link to="/user/detail/1" class="action-btn primary">
          查看用户1
        </router-link>
        <router-link to="/user/detail/2" class="action-btn">
          查看用户2
        </router-link>
        <router-link to="/user/detail/3" class="action-btn">
          查看用户3
        </router-link>
      </div>
    </div>
    
    <div class="info-panel">
      <h4>💡 路由结构说明</h4>
      <div class="route-structure">
        <code>/user</code> - 用户模块主页面（当前页面）<br>
        <code>/user/detail/:id</code> - 用户详情页面<br>
        <br>
        这是一个嵌套路由的例子，左侧用户列表保持不变，右侧内容根据路由动态切换。
      </div>
    </div>
  </div>
</template>

<script setup>
// 这个组件不需要特殊逻辑，主要是展示用途
</script>

<style scoped>
.user-list-content {
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 50px;
}

.welcome-section h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 20px;
}

.description {
  font-size: 1.2em;
  color: #666;
  line-height: 1.6;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3em;
  margin-bottom: 20px;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.feature-card p {
  color: #666;
  line-height: 1.5;
}

.quick-actions {
  text-align: center;
  margin-bottom: 50px;
}

.quick-actions h3 {
  color: #2c3e50;
  margin-bottom: 25px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #f8f9fa;
  color: #495057;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
}

.action-btn:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
}

.action-btn.primary {
  background-color: #42b883;
  color: white;
  border-color: #42b883;
}

.action-btn.primary:hover {
  background-color: #369870;
  border-color: #369870;
}

.info-panel {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.info-panel h4 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.route-structure {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
  line-height: 1.8;
  color: #495057;
}

.route-structure code {
  background-color: #e3f2fd;
  padding: 2px 6px;
  border-radius: 4px;
  color: #1976d2;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-list-content {
    padding: 20px;
  }
  
  .welcome-section h1 {
    font-size: 2em;
  }
  
  .feature-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .action-btn {
    width: 200px;
  }
}
</style>