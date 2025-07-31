<template>
  <div class="global-counter">
    <h2>全局计数器演示</h2>
    <p class="description">
      这个页面和Counter页面共享同一个Pinia store状态！
    </p>
    
    <!-- 显示store中的状态信息 -->
    <div class="counter-info">
      <h3>{{ counterStore.countMessage }}</h3>
      <p>双倍值: {{ counterStore.doubleCount }}</p>
      <p>当前数字是: {{ counterStore.isEven ? '偶数' : '奇数' }}</p>
    </div>

    <!-- 不同的操作按钮 -->
    <div class="counter-controls">
      <button @click="counterStore.incrementBy(5)" class="btn-large">+5</button>
      <button @click="counterStore.incrementBy(10)" class="btn-large">+10</button>
      <button @click="counterStore.decrement" class="btn-danger">-1</button>
      <button @click="counterStore.reset" class="btn-reset">重置</button>
    </div>

    <!-- 异步操作 -->
    <div class="async-section">
      <h4>异步操作</h4>
      <button @click="handleAsyncIncrement" :disabled="loading" class="btn-async">
        {{ loading ? '正在处理...' : '异步+1 (1秒延迟)' }}
      </button>
    </div>

    <!-- 修改计数器名称 -->
    <div class="name-section">
      <h4>修改计数器名称</h4>
      <input 
        v-model="newName" 
        @keyup.enter="updateName"
        placeholder="输入新名称"
        class="name-input"
      />
      <button @click="updateName" class="btn-update">更新</button>
    </div>
  </div>
</template>

<script setup>
// =============================================
// Pinia 跨组件状态共享演示
// =============================================
// 这个组件演示了 Pinia 最重要的特性：跨组件状态共享
// 
// 关键演示点：
// 1. 与 Counter.vue 组件共享同一个 counterStore 实例
// 2. 在这个组件中修改状态，Counter.vue 会自动更新
// 3. 在 Counter.vue 中修改状态，这个组件也会自动更新
// 4. 展示了更多 Pinia 的高级用法：异步操作、复杂计算等
// =============================================

import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

// =============================================
// 获取同一个 Store 实例
// =============================================
// 关键原理：
// ✅ 单例模式 - useCounterStore() 在整个应用中返回同一个实例
// ✅ 跨组件共享 - Counter.vue 和这个组件使用的是同一个 store
// ✅ 实时同步 - 任何一个组件修改状态，其他组件立即更新
// =============================================

const counterStore = useCounterStore()

// =============================================
// 组件本地状态（与 Pinia 状态对比）
// =============================================
// 这些状态只在这个组件中使用，不会影响其他组件
// 与 Pinia 全局状态的区别：
// - loading: 只控制这个组件的按钮状态
// - newName: 只在这个组件的输入框中使用
// =============================================

const loading = ref(false)  // 异步操作加载状态
const newName = ref('')    // 输入框的临时值

// =============================================
// 异步操作演示
// =============================================
// Pinia 完美支持异步操作，可以处理：
// - API 调用
// - 定时器
// - 文件上传
// - 其他异步任务
// =============================================

const handleAsyncIncrement = async () => {
  loading.value = true  // 显示加载状态
  await counterStore.incrementAsync()  // 调用 store 的异步方法
  loading.value = false // 隐藏加载状态
}

// =============================================
// 复杂状态操作演示
// =============================================
// 展示了更复杂的状态操作：
// 1. 表单输入处理
// 2. 数据验证
// 3. 状态更新
// =============================================

const updateName = () => {
  if (newName.value.trim()) {
    // 验证输入不为空后更新 store
    counterStore.setName(newName.value.trim())
    newName.value = '' // 清空输入框
  }
}

// =============================================
// Pinia 跨组件共享原理总结
// =============================================
// 为什么两个组件能共享状态？
// 
// 1. **单例模式**: useCounterStore() 总是返回同一个实例
// 2. **响应式系统**: Vue 的响应式系统确保数据变化时自动更新界面
// 3. **依赖追踪**: Vue 自动追踪哪些组件使用了哪些数据
// 
// 实际效果：
// - 在 Counter.vue 点击 +1 → GlobalCounter.vue 立即显示新值
// - 在 GlobalCounter.vue 点击 +5 → Counter.vue 立即显示新值
// - 两个组件完全同步，就像操作同一个变量
// =============================================
</script>

<style scoped>
.global-counter {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.description {
  color: #666;
  font-style: italic;
  margin-bottom: 20px;
}

.counter-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.counter-info h3 {
  color: #42b883;
  margin-bottom: 10px;
}

.counter-controls {
  margin: 20px 0;
}

.counter-controls button {
  margin: 0 8px 8px 0;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-large {
  background-color: #28a745;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-reset {
  background-color: #6c757d;
  color: white;
}

.async-section, .name-section {
  margin: 30px 0;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn-async {
  background-color: #17a2b8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-async:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.name-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  width: 200px;
}

.btn-update {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>