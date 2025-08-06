// Counter Store - 计数器状态管理
// 核心优势：
// ✅ 全局状态共享 - 多个组件可以访问同一份数据
// ✅ 响应式自动更新 - 数据变化时所有相关组件自动重新渲染
// ✅ 支持异步操作 - 可以处理 API 调用等异步逻辑
// 与普通组件数据的对比：
// 普通组件数据：只能在该组件内使用，需要通过 props/emit 传递
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// defineStore('store名称', 定义函数)
// 返回一个函数，调用该函数获取 store 实例
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)           // 计数值，所有组件共享
  const name = ref('Vue Counter') // 计数器名称，可自定义
  const doubleCount = computed(() => count.value * 2)  // 双倍值
  const isEven = computed(() => count.value % 2 === 0)  // 判断奇偶
  const countMessage = computed(() => {
    return `${name.value}: ${count.value} (${isEven.value ? '偶数' : '奇数'})`
  })
  
  function increment() {
    count.value++  // 直接修改 state，自动触发响应式更新
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

  // =============================================
  // 异步 Actions - 支持异步操作
  // =============================================
  // Pinia 完美支持异步操作，可以处理 API 调用、定时器等
  // 组件中可以用 await 调用这些方法
  // =============================================
  
  async function incrementAsync() {
    // 模拟异步操作（如 API 调用）
    await new Promise(resolve => setTimeout(resolve, 1000))
    count.value++  // 异步操作完成后修改 state
  }

  // =============================================
  // 返回接口 - 暴露给外部使用的内容
  // =============================================
  // 只有在这里返回的内容才能在组件中被访问
  // 可以选择性暴露，隐藏内部实现细节
  // =============================================
  
  return {
    // State - 暴露状态数据
    count,
    name,
    // Getters - 暴露计算属性
    doubleCount,
    isEven,
    countMessage,
    // Actions - 暴露操作方法
    increment,
    decrement,
    incrementBy,
    reset,
    setName,
    incrementAsync
  }
})