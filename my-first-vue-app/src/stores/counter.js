// Counter Store - 计数器状态管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 使用Composition API风格定义store
export const useCounterStore = defineStore('counter', () => {
  // State (状态) - 使用ref创建响应式数据
  const count = ref(0)
  const name = ref('Vue Counter')

  // Getters (计算属性) - 基于state计算派生数据
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)
  const countMessage = computed(() => {
    return `${name.value}: ${count.value} (${isEven.value ? '偶数' : '奇数'})`
  })

  // Actions (操作方法) - 修改state的方法
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function incrementBy(amount) {
    count.value += amount
  }

  function reset() {
    count.value = 0
  }

  function setName(newName) {
    name.value = newName
  }

  // 异步action示例
  async function incrementAsync() {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1000))
    count.value++
  }

  // 返回要暴露的state、getters和actions
  return {
    // State
    count,
    name,
    // Getters
    doubleCount,
    isEven,
    countMessage,
    // Actions
    increment,
    decrement,
    incrementBy,
    reset,
    setName,
    incrementAsync
  }
})