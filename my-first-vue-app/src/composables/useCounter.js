// =============================================
// Counter Hook - 计数器逻辑封装
// =============================================
// 这个hook演示了如何将组件中的状态逻辑抽取成可复用的hook
// 
// 主要功能：
// 1. 封装计数器的基本状态和操作
// 2. 提供增减、重置等常用方法
// 3. 支持自定义初始值和步长
// 4. 可以在多个组件间复用
// =============================================

import { ref, computed } from 'vue'

/**
 * 计数器Hook
 * @param {number} initialValue - 初始值，默认为0
 * @param {number} step - 步长，默认为1
 * @returns {object} 返回计数器状态和操作方法
 */
export function useCounter(initialValue = 0, step = 1) {
  // =============================================
  // 状态定义
  // =============================================
  const count = ref(initialValue)
  const originalValue = ref(initialValue)

  // =============================================
  // 计算属性
  // =============================================
  const isZero = computed(() => count.value === 0)
  const isPositive = computed(() => count.value > 0)
  const isNegative = computed(() => count.value < 0)
  const isEven = computed(() => count.value % 2 === 0)
  const doubleCount = computed(() => count.value * 2)
  
  // 状态描述
  const status = computed(() => {
    if (count.value > 10) return '很大了！'
    if (count.value < 0) return '负数了！'
    if (count.value === 0) return '归零状态'
    return '正常计数中'
  })

  // =============================================
  // 操作方法
  // =============================================
  
  /**
   * 增加计数
   * @param {number} amount - 增加的数量，默认使用step
   */
  const increment = (amount = step) => {
    count.value += amount
  }

  /**
   * 减少计数
   * @param {number} amount - 减少的数量，默认使用step
   */
  const decrement = (amount = step) => {
    count.value -= amount
  }

  /**
   * 重置到初始值
   */
  const reset = () => {
    count.value = originalValue.value
  }

  /**
   * 设置新值
   * @param {number} newValue - 新的值
   */
  const setValue = (newValue) => {
    count.value = newValue
  }

  /**
   * 设置随机值
   * @param {number} min - 最小值，默认0
   * @param {number} max - 最大值，默认100
   */
  const setRandomValue = (min = 0, max = 100) => {
    count.value = Math.floor(Math.random() * (max - min + 1)) + min
  }

  // =============================================
  // 返回hook的所有功能
  // =============================================
  return {
    // 状态
    count,
    
    // 计算属性
    isZero,
    isPositive,
    isNegative,
    isEven,
    doubleCount,
    status,
    
    // 操作方法
    increment,
    decrement,
    reset,
    setValue,
    setRandomValue
  }
}

// =============================================
// Hook使用示例
// =============================================
/*
在组件中使用：

<script setup>
import { useCounter } from '@/composables/useCounter.js'

// 创建计数器实例
const { 
  count, 
  status, 
  doubleCount, 
  increment, 
  decrement, 
  reset 
} = useCounter(0, 1) // 初始值0，步长1

// 创建另一个计数器实例（独立状态）
const { 
  count: count2, 
  increment: increment2, 
  decrement: decrement2 
} = useCounter(10, 5) // 初始值10，步长5
</script>

<template>
  <div>
    <p>计数器1: {{ count }} ({{ status }})</p>
    <p>双倍值: {{ doubleCount }}</p>
    <button @click="increment()">+1</button>
    <button @click="decrement()">-1</button>
    <button @click="reset()">重置</button>
    
    <p>计数器2: {{ count2 }}</p>
    <button @click="increment2()">+5</button>
    <button @click="decrement2()">-5</button>
  </div>
</template>
*/