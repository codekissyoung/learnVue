<template>
  <div class="modern-css-demo">
    <h1>现代CSS布局演示</h1>
    
    <!-- Grid布局示例 -->
    <section class="grid-demo">
      <h2>CSS Grid 布局</h2>
      <div class="holy-grail">
        <header class="grid-header">Header</header>
        <nav class="grid-nav">Nav</nav>
        <main class="grid-main">
          <h3>主内容区</h3>
          <p>这是使用CSS Grid实现的经典Holy Grail布局</p>
        </main>
        <aside class="grid-aside">Sidebar</aside>
        <footer class="grid-footer">Footer</footer>
      </div>
    </section>

    <!-- Flexbox布局示例 -->
    <section class="flex-demo">
      <h2>Flexbox 布局</h2>
      <div class="navbar-demo">
        <div class="logo">Logo</div>
        <nav class="nav-links">
          <a href="#" class="nav-link">首页</a>
          <a href="#" class="nav-link">产品</a>
          <a href="#" class="nav-link">关于</a>
        </nav>
        <div class="user-actions">
          <button class="btn">登录</button>
          <button class="btn primary">注册</button>
        </div>
      </div>
      
      <div class="card-grid">
        <div class="card" v-for="i in 6" :key="i">
          <div class="card-image">🎨</div>
          <h3>卡片 {{ i }}</h3>
          <p>使用Flexbox实现的响应式卡片布局</p>
        </div>
      </div>
    </section>

    <!-- CSS变量和现代特性 -->
    <section class="modern-features">
      <h2>现代CSS特性</h2>
      <div class="feature-grid">
        <div class="feature-card variable-demo">
          <h3>CSS变量演示</h3>
          <p>CSS变量需要在全局作用域中定义才能正常工作。在scoped样式中，我们使用具体数值来避免影响框架全局样式。</p>
        </div>
        
        <div class="feature-card clamp-demo">
          <h3>响应式字体</h3>
          <p class="clamp-text">这段文字使用clamp()函数实现响应式字体大小</p>
        </div>
        
        <div class="feature-card aspect-ratio-demo">
          <h3>宽高比</h3>
          <div class="aspect-box">16:9 宽高比盒子</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 现代CSS布局演示页面
// 使用具体数值避免影响Vue 3项目的全局样式
</script>

<style scoped>
/* 使用具体数值，避免影响Vue 3全局样式 */
/* 确保所有样式只在演示容器内生效 */
.modern-css-demo * {
  box-sizing: border-box;
}

.modern-css-demo header {
  position: static !important;
  z-index: auto !important;
}

.modern-css-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

/* Grid布局演示 */
.grid-demo {
  margin-bottom: 32px;
}

.holy-grail {
  display: grid;
  grid-template-areas: 
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  min-height: 300px;
  border: 2px solid #42b883;
  border-radius: 8px;
  overflow: hidden;
}

.holy-grail .grid-header {
  grid-area: header;
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.holy-grail .grid-nav {
  grid-area: nav;
  background: #f3f4f6;
  padding: 16px;
}

.holy-grail .grid-main {
  grid-area: main;
  padding: 16px;
  background: white;
}

.holy-grail .grid-aside {
  grid-area: aside;
  background: #f3f4f6;
  padding: 16px;
}

.holy-grail .grid-footer {
  grid-area: footer;
  background: #369870;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

/* Flexbox布局演示 */
.flex-demo {
  margin-bottom: 32px;
}

.navbar-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 24px;
}

.logo {
  font-weight: bold;
  color: #42b883;
  font-size: 18px;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #42b883;
}

.user-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.btn.primary {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 响应式卡片网格 */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1 1 300px; /* 灵活的响应式 */
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card-image {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 16px;
}

/* 现代CSS特性演示 */
.modern-features {
  margin-bottom: 32px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.feature-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}


/* clamp()响应式字体 */
.clamp-text {
  font-size: clamp(1rem, 3vw, 2rem);
  line-height: 1.5;
  color: #374151;
}

/* aspect-ratio现代特性 */
.aspect-box {
  aspect-ratio: 16 / 9;
  background: linear-gradient(45deg, #42b883, #369870);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .holy-grail {
    grid-template-areas: 
      "header"
      "nav"
      "main"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
  
  .navbar-demo {
    flex-direction: column;
    gap: 16px;
  }
  
  .nav-links {
    flex-direction: column;
    text-align: center;
  }
}
</style>