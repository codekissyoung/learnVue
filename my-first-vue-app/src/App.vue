<script setup>
import { ref } from 'vue'
const title = ref('Hello Vue 3')
const message = ref('欢迎来到现代前端开发的世界')
const showTip = ref(false)
const changeMessage = () => {
  message.value = '消息已改变 - ' + new Date().toLocaleTimeString()
  showTip.value = !showTip.value
}

import Counter from './Counter.vue' 
</script>

<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>

    <button @click="changeMessage">点击改变消息</button>
    <p v-if="showTip">提示 这是Vue 3的响应式数据 </p>

    <Counter title="我的第一个组件" :initial-value="5" />
    <Counter title="另一个计数器" :initial-value="0" />
  </div>
</template>

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