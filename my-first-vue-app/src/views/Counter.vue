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
// =============================================
// Pinia 在组件中的使用演示
// =============================================
// 这个组件展示了如何在 Vue 组件中使用 Pinia store
// 重点演示了 Pinia 的核心特性：
// 1. 如何获取和使用 store 实例
// 2. 如何访问 store 中的 state 和 getters
// 3. 如何调用 store 中的 actions
// 4. Pinia 如何实现跨组件状态共享
// =============================================

import { computed } from 'vue'
import { useCounterStore } from '@/stores/counter'

// 组件的 props - 普通的组件属性
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

// =============================================
// 步骤 1: 获取 Pinia Store 实例
// =============================================
// 调用 useCounterStore() 函数获取 store 实例
// 关键特性：
// ✅ 单例模式 - 在整个应用中，同一个 store 只有一个实例
// ✅ 响应式 - store 中的数据变化时，组件会自动更新
// ✅ 全局共享 - 不同组件中获取的是同一个实例
// =============================================

const counterStore = useCounterStore()

// =============================================
// 步骤 2: 访问 Store 中的 State 和 Getters
// =============================================
// 直接通过 store 实例访问 state 和 getters
// 注意：为了保持响应式，通常使用 computed() 包装
// 这样当 store 中的数据变化时，组件会自动重新渲染
// =============================================

// 访问 store 中的 state
const count = computed(() => counterStore.count)

// 访问 store 中的 getters（计算属性）
const status = computed(() => {
  if (counterStore.count > 10) return '很大了！'
  if (counterStore.count < 0) return '负数了！'
  if (counterStore.count === 0) return '归零状态'
  return '正常计数中'
})

// =============================================
// 步骤 3: 调用 Store 中的 Actions
// =============================================
// 通过 store 实例调用 actions 来修改状态
// Pinia 的优势：
// ✅ 集中管理 - 所有状态修改逻辑都在 store 中
// ✅ 自动响应式 - 调用 action 后，所有使用该 state 的组件都会自动更新
// ✅ 跨组件同步 - 如果其他组件也在使用这个 store，它们也会同步更新
// =============================================

const increase = () => {
  counterStore.increment()  // 调用 store 的 increment action
}

const decrease = () => {
  counterStore.decrement()  // 调用 store 的 decrement action
}

const reset = () => {
  counterStore.reset()      // 调用 store 的 reset action
}

// =============================================
// Pinia 跨组件状态共享演示
// =============================================
// 这个组件和 GlobalCounter.vue 组件共享同一个 counterStore
// 当在这个组件中修改 count 时，GlobalCounter.vue 也会同步更新
// 反之亦然 - 这就是 Pinia 的核心价值！
// =============================================
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