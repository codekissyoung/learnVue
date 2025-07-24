<template>
  <!-- 组件的HTML结构 -->
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
// 导入Vue的响应式函数
import { ref, computed } from 'vue'

// 定义组件的属性 - 父组件传递过来的数据
const props = defineProps({
  title: {
    type: String,
    default: '计数器组件'
  },
  initialValue: {
    type: Number,
    default: 0
  }
})

// 响应式数据 - 计数值
const count = ref(props.initialValue)

// 计算属性 - 根据count自动计算状态
const status = computed(() => {
  if (count.value > 10) return '很大了！'
  if (count.value < 0) return '负数了！'
  if (count.value === 0) return '归零状态'
  return '正常计数中'
})

// 方法定义 - 组件的行为
const increase = () => {
  count.value++
}

const decrease = () => {
  count.value--
}

const reset = () => {
  count.value = props.initialValue
}

// 对比传统方式：
// jQuery: $('#count').text(newValue) - 手动更新DOM
// Vue 3: count.value = newValue - 自动更新DOM
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