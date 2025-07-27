<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <!-- 事件绑定 - 类似jQuery的click事件 -->
    <button @click="changeMessage">点击改变消息</button>
    <!-- 条件渲染 - 根据数据显示/隐藏 -->
    <p v-if="showTip">提示 这是Vue 3的响应式数据 </p>

    <!-- 使用自定义组件 - 就像使用HTML标签一样 -->
    <Counter title="我的第一个组件" :initial-value="5" />
    <Counter title="另一个计数器" :initial-value="0" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Counter from './Counter.vue' // 导入我们创建的Counter组件

// ref() 创建响应式数据 - 数据变化时HTML自动更新
const title = ref('Vue 3 响应式数据示例')
const message = ref('欢迎来到现代前端开发的世界')
const showTip = ref(false)

const changeMessage = () => {
  message.value = '消息已改变 - ' + new Date().toLocaleTimeString()
  showTip.value = !showTip.value
}
</script>

<style>
.app {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}
button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
}
button:hover {
  background-color: #369870;
}
h1 {
  color: #42b883;
}
</style>