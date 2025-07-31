<template>
  <div class="counter">
    <h3>{{ title }}</h3>
    <div class="counter-display">
      <span class="count-number">{{ count }}</span>
    </div>
    <div class="counter-buttons">
      <button @click="decrease" class="btn-decrease">-1</button>
      <button @click="reset" class="btn-reset">重置</button>
      <button @click="increase" class="btn-increase">+1</button>
    </div>
    <p class="counter-status">
      当前状态: {{ status }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCounterStore } from '@/stores/counter'

const props = defineProps({
  title: {
    type: String,
    default: '计数器'
  },
  initialValue: {
    type: Number,
    default: 0
  }
})

// 使用Pinia store
const counterStore = useCounterStore()

// 从store获取状态和方法
const count = computed(() => counterStore.count)
const status = computed(() => {
  if (counterStore.count > 10) return '很大了！'
  if (counterStore.count < 0) return '负数了！'
  if (counterStore.count === 0) return '归零状态'
  return '正常计数中'
})

// 使用store的actions
const increase = () => {
  counterStore.increment()
}
const decrease = () => {
  counterStore.decrement()
}
const reset = () => {
  counterStore.reset()
}
</script>

<style scoped>
/* scoped样式 - 只影响当前组件 */
.counter {
  border: 2px solid #42b883;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  text-align: center;
  background-color: #f9f9f9;
}

.counter-display {
  margin: 20px 0;
}

.count-number {
  font-size: 48px;
  font-weight: bold;
  color: #42b883;
  display: inline-block;
  min-width: 80px;
}

.counter-buttons {
  margin: 20px 0;
}

.counter-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-increase {
  background-color: #4CAF50;
  color: white;
}

.btn-decrease {
  background-color: #f44336;
  color: white;
}

.btn-reset {
  background-color: #2196F3;
  color: white;
}

.counter-buttons button:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}

.counter-status {
  color: #666;
  font-style: italic;
  margin-top: 15px;
}
</style>