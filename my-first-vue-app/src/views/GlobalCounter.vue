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
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

// 使用同一个store实例
const counterStore = useCounterStore()

// 本地状态用于UI交互
const loading = ref(false)
const newName = ref('')

// 异步操作
const handleAsyncIncrement = async () => {
  loading.value = true
  await counterStore.incrementAsync()
  loading.value = false
}

// 更新名称
const updateName = () => {
  if (newName.value.trim()) {
    counterStore.setName(newName.value.trim())
    newName.value = ''
  }
}
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