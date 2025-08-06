<template>
  <div class="home">
    <h1>欢迎来到首页</h1>
    <p>这是Vue Router学习项目的首页</p>    
  </div>
</template>

<script setup>
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