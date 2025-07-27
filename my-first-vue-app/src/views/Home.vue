<template>
  <div class="home">
    <h1>欢迎来到首页</h1>
    <p>这是Vue Router学习项目的首页</p>
    
    <div class="navigation">
      <router-link to="/about" class="nav-link">关于页面</router-link>
      <router-link to="/counter" class="nav-link">计数器</router-link>
    </div>
    
    <div class="content">
      <h2>Vue Router 核心概念：</h2>
      <ul>
        <li><strong>路由(Route)</strong>: URL路径与组件的映射关系</li>
        <li><strong>路由器(Router)</strong>: 管理所有路由的实例</li>
        <li><strong>导航(Navigation)</strong>: router-link实现页面跳转</li>
        <li><strong>视图(View)</strong>: router-view显示当前路由组件</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Vue Router让我们可以创建单页应用(SPA)
// 用户点击链接时，不会重新加载整个页面，只是切换显示的组件
console.log('Home页面组件已加载')
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
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

.content {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}

.content ul {
  line-height: 1.8;
}
</style>