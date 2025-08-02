<template>
  <div class="reactivity-demo">
    <h1>Vue 3 响应式系统演示</h1>
    
    <!-- 基础响应式演示 -->
    <section class="demo-section">
      <h2>🔄 基础响应式数据</h2>
      <div class="demo-box">
        <p>count: {{ count }}</p>
        <p>message: {{ message }}</p>
        <div class="controls">
          <button @click="count++">增加 count</button>
          <button @click="message = message === 'hello' ? 'world' : 'hello'">
            切换 message
          </button>
        </div>
      </div>
    </section>

    <!-- ref vs reactive 对比 -->
    <section class="demo-section">
      <h2>📊 ref vs reactive 对比</h2>
      <div class="demo-grid">
        <div class="demo-box">
          <h3>ref (基本类型)</h3>
          <p>refCount: {{ refCount }}</p>
          <p>refMessage: {{ refMessage }}</p>
          <div class="controls">
            <button @click="refCount++">增加 refCount</button>
            <button @click="refMessage += '!'">添加感叹号</button>
          </div>
          <small>注意：ref需要通过.value访问</small>
        </div>
        
        <div class="demo-box">
          <h3>reactive (对象)</h3>
          <p>user.name: {{ user.name }}</p>
          <p>user.age: {{ user.age }}</p>
          <div class="controls">
            <button @click="user.age++">增加年龄</button>
            <button @click="user.name = user.name === 'Link' ? 'Vue' : 'Link'">
              切换姓名
            </button>
          </div>
          <small>注意：reactive直接访问属性</small>
        </div>
      </div>
    </section>

    <!-- computed 计算属性演示 -->
    <section class="demo-section">
      <h2>🧮 computed 计算属性</h2>
      <div class="demo-box">
        <p>num1: {{ num1 }}</p>
        <p>num2: {{ num2 }}</p>
        <p class="computed-result">sum (computed): {{ sum }}</p>
        <p class="computed-result">average (computed): {{ average }}</p>
        <div class="controls">
          <button @click="num1 += 5">num1 + 5</button>
          <button @click="num2 += 10">num2 + 10</button>
          <button @click="resetNumbers">重置</button>
        </div>
        <small>🔍 打开控制台查看computed的缓存机制</small>
      </div>
    </section>

    <!-- 嵌套对象响应式 -->
    <section class="demo-section">
      <h2>🪆 嵌套对象响应式</h2>
      <div class="demo-box">
        <h3>用户信息</h3>
        <p>姓名: {{ profile.user.name }}</p>
        <p>年龄: {{ profile.user.age }}</p>
        <p>邮箱: {{ profile.user.email }}</p>
        <h3>设置</h3>
        <p>主题: {{ profile.settings.theme }}</p>
        <p>语言: {{ profile.settings.language }}</p>
        <div class="controls">
          <button @click="updateProfile">更新用户信息</button>
          <button @click="toggleTheme">切换主题</button>
          <button @click="profile.settings.language = profile.settings.language === 'zh' ? 'en' : 'zh'">
            切换语言
          </button>
        </div>
      </div>
    </section>

    <!-- 响应式数组 -->
    <section class="demo-section">
      <h2>📋 响应式数组</h2>
      <div class="demo-box">
        <h3>任务列表 ({{ todos.length }} 项)</h3>
        <ul class="todo-list">
          <li v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
            <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
            <div class="todo-actions">
              <button @click="toggleTodo(index)" class="toggle-btn">
                {{ todo.completed ? '✅' : '⏳' }}
              </button>
              <button @click="removeTodo(index)" class="remove-btn">🗑️</button>
            </div>
          </li>
        </ul>
        
        <div class="controls">
          <input 
            v-model="newTodo" 
            @keyup.enter="addTodo"
            placeholder="输入新任务..."
            class="todo-input"
          >
          <button @click="addTodo">添加任务</button>
          <button @click="clearCompleted">清除已完成</button>
        </div>
        
        <p class="stats">
          总计: {{ todos.length }} | 
          未完成: {{ activeTodos }} | 
          已完成: {{ completedTodos }}
        </p>
      </div>
    </section>

    <!-- watch 效果演示 -->
    <section class="demo-section">
      <h2>👀 watch 监听效果</h2>
      <div class="demo-box">
        <p>被监听的值: {{ watchedValue }}</p>
        <p>变化次数: {{ changeCount }}</p>
        <p>上次变化时间: {{ lastChangeTime }}</p>
        
        <div class="controls">
          <button @click="watchedValue++">增加值</button>
          <button @click="watchedValue--">减少值</button>
          <button @click="watchedValue = Math.floor(Math.random() * 100)">随机值</button>
        </div>
        
        <div class="log-box">
          <h4>变化日志:</h4>
          <div class="logs">
            <p v-for="log in logs" :key="log.id" class="log-item">
              {{ log.message }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'

// 基础响应式数据
const count = ref(0)
const message = ref('hello')

// ref vs reactive 对比
const refCount = ref(10)
const refMessage = ref('Hello Ref')

const user = reactive({
  name: 'Link',
  age: 25
})

// computed 计算属性
const num1 = ref(10)
const num2 = ref(20)

const sum = computed(() => {
  console.log('🧮 重新计算 sum')
  return num1.value + num2.value
})

const average = computed(() => {
  console.log('🧮 重新计算 average')
  return (num1.value + num2.value) / 2
})

function resetNumbers() {
  num1.value = 10
  num2.value = 20
}

// 嵌套对象响应式
const profile = reactive({
  user: {
    name: 'Link',
    age: 30,
    email: 'link@example.com'
  },
  settings: {
    theme: 'light',
    language: 'zh'
  }
})

function updateProfile() {
  profile.user.name = 'Vue Master'
  profile.user.age++
  profile.user.email = 'vue@example.com'
}

function toggleTheme() {
  profile.settings.theme = profile.settings.theme === 'light' ? 'dark' : 'light'
}

// 响应式数组
const todos = reactive([
  { id: 1, text: '学习Vue 3响应式原理', completed: true },
  { id: 2, text: '实现mini响应式系统', completed: true },
  { id: 3, text: '创建响应式demo', completed: false },
  { id: 4, text: '深入理解computed', completed: false }
])

const newTodo = ref('')

const activeTodos = computed(() => {
  return todos.filter(todo => !todo.completed).length
})

const completedTodos = computed(() => {
  return todos.filter(todo => todo.completed).length
})

function addTodo() {
  if (newTodo.value.trim()) {
    todos.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed
}

function removeTodo(index) {
  todos.splice(index, 1)
}

function clearCompleted() {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].completed) {
      todos.splice(i, 1)
    }
  }
}

// watch 监听演示
const watchedValue = ref(42)
const changeCount = ref(0)
const lastChangeTime = ref('')
const logs = reactive([])

watch(watchedValue, (newVal, oldVal) => {
  changeCount.value++
  lastChangeTime.value = new Date().toLocaleTimeString()
  
  const log = {
    id: Date.now(),
    message: `${new Date().toLocaleTimeString()}: ${oldVal} → ${newVal}`
  }
  
  logs.unshift(log)
  
  // 保持日志数量不超过5条
  if (logs.length > 5) {
    logs.splice(5)
  }
  
  console.log('👀 watch触发:', oldVal, '→', newVal)
})

// 页面加载完成后的初始化
nextTick(() => {
  console.log('🎉 响应式Demo页面加载完成!')
  console.log('💡 提示: 打开浏览器控制台查看响应式系统的工作过程')
})
</script>

<style scoped>
.reactivity-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
}

.demo-section h2 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.demo-box {
  background: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.controls {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #42b983;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

button:hover {
  background: #369970;
}

.computed-result {
  font-weight: bold;
  color: #42b983;
  background: #f0f9ff;
  padding: 8px;
  border-radius: 4px;
  border-left: 4px solid #42b983;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item.completed span {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-actions {
  display: flex;
  gap: 5px;
}

.toggle-btn, .remove-btn {
  padding: 4px 8px;
  font-size: 12px;
  min-width: auto;
}

.toggle-btn {
  background: #f39c12;
}

.remove-btn {
  background: #e74c3c;
}

.todo-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  flex: 1;
  min-width: 200px;
}

.stats {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  font-style: italic;
}

.log-box {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.logs {
  max-height: 120px;
  overflow-y: auto;
}

.log-item {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #495057;
  margin: 5px 0;
  padding: 5px;
  background: white;
  border-radius: 3px;
}

small {
  color: #666;
  font-style: italic;
  display: block;
  margin-top: 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .controls {
    flex-direction: column;
  }
  
  .todo-input {
    min-width: auto;
    margin-bottom: 10px;
  }
}
</style>