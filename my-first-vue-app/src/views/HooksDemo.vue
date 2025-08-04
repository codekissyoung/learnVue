<template>
  <div class="hooks-demo">
    <h1>🎣 Vue 3 Hooks (Composables) 演示</h1>
    <p class="description">
      演示如何使用自定义hooks将组件逻辑抽取为可复用的功能模块
    </p>

    <!-- Counter Hook 演示 -->
    <section class="demo-section">
      <h2>🔢 useCounter Hook 演示</h2>
      <div class="demo-grid">
        <!-- 计数器1 -->
        <div class="demo-box">
          <h3>计数器 1 (步长: 1)</h3>
          <div class="counter-display">
            <span class="count-number">{{ counter1.count }}</span>
          </div>
          <p class="status">状态: {{ counter1.status }}</p>
          <p class="computed">双倍值: {{ counter1.doubleCount }}</p>
          <p class="computed">是否为偶数: {{ counter1.isEven ? '是' : '否' }}</p>
          
          <div class="controls">
            <button @click="counter1.increment()" class="btn-primary">+1</button>
            <button @click="counter1.decrement()" class="btn-danger">-1</button>
            <button @click="counter1.reset()" class="btn-secondary">重置</button>
            <button @click="counter1.setRandomValue()" class="btn-warning">随机</button>
          </div>
        </div>

        <!-- 计数器2 -->
        <div class="demo-box">
          <h3>计数器 2 (步长: 5, 初始值: 10)</h3>
          <div class="counter-display">
            <span class="count-number">{{ counter2.count }}</span>
          </div>
          <p class="status">状态: {{ counter2.status }}</p>
          <p class="computed">双倍值: {{ counter2.doubleCount }}</p>
          <p class="computed">是否为正数: {{ counter2.isPositive ? '是' : '否' }}</p>
          
          <div class="controls">
            <button @click="counter2.increment()" class="btn-primary">+5</button>
            <button @click="counter2.decrement()" class="btn-danger">-5</button>
            <button @click="counter2.reset()" class="btn-secondary">重置</button>
            <button @click="counter2.setValue(100)" class="btn-info">设为100</button>
          </div>
        </div>
      </div>
      
      <div class="code-explanation">
        <h4>🔍 代码对比：</h4>
        <div class="comparison">
          <div class="before">
            <h5>❌ 使用Hook之前 (组件内直接写逻辑)</h5>
            <pre><code>// 每个组件都要重复写这些逻辑
const count = ref(0)
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => count.value = 0
const doubleCount = computed(() => count.value * 2)
// ... 更多重复逻辑</code></pre>
          </div>
          <div class="after">
            <h5>✅ 使用Hook之后 (一行代码复用)</h5>
            <pre><code>// 一行代码获得所有功能
const { count, increment, decrement, reset, doubleCount } = useCounter(0, 1)

// 可以创建多个独立的计数器实例
const counter2 = useCounter(10, 5)</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- API Hook 演示 -->
    <section class="demo-section">
      <h2>🌐 useApi Hook 演示</h2>
      
      <!-- 健康检查 -->
      <div class="demo-box">
        <h3>服务器健康检查</h3>
        <div class="server-status">
          <el-tag :type="health.serverOnline ? 'success' : 'danger'" size="large">
            {{ health.serverOnline ? '✅ 服务器在线' : '❌ 服务器离线' }}
          </el-tag>
          <div v-if="health.healthData" class="health-info">
            <p><strong>版本:</strong> {{ health.healthData.version }}</p>
            <p><strong>状态:</strong> {{ health.healthData.status }}</p>
          </div>
        </div>
        <div class="controls">
          <button @click="health.checkHealth()" :loading="health.loading" class="btn-primary">
            检查状态
          </button>
        </div>
      </div>

      <!-- 问候API -->
      <div class="demo-box">
        <h3>问候API演示</h3>
        <div class="api-controls">
          <el-input
            v-model="helloName"
            placeholder="请输入你的名字"
            style="width: 200px; margin-right: 10px;"
          />
          <button 
            @click="hello.sayHelloGET(helloName)" 
            :disabled="hello.loading"
            class="btn-success"
          >
            {{ hello.loading ? '请求中...' : 'GET问候' }}
          </button>
          <button 
            @click="hello.sayHelloPOST(helloName)" 
            :disabled="hello.loading"
            class="btn-info"
          >
            {{ hello.loading ? '请求中...' : 'POST问候' }}
          </button>
        </div>
        
        <div v-if="hello.response" class="response-box">
          <h4>📥 响应结果:</h4>
          <pre>{{ JSON.stringify(hello.response, null, 2) }}</pre>
        </div>
      </div>

      <div class="code-explanation">
        <h4>🔍 API Hook的优势：</h4>
        <ul class="advantages">
          <li><strong>统一的状态管理</strong>: loading、error、data状态自动管理</li>
          <li><strong>错误处理</strong>: 统一的错误提示和处理逻辑</li>
          <li><strong>代码复用</strong>: 同样的API逻辑可以在多个组件中使用</li>
          <li><strong>类型安全</strong>: 集中管理API调用，减少错误</li>
        </ul>
      </div>
    </section>

    <!-- Form Hook 演示 -->
    <section class="demo-section">
      <h2>📝 useForm Hook 演示</h2>
      
      <div class="demo-box">
        <h3>用户注册表单</h3>
        <form @submit.prevent="onSubmit" class="demo-form">
          <div class="form-group">
            <label>姓名:</label>
            <input 
              v-model="form.formData.name" 
              placeholder="请输入姓名"
              :class="{ error: form.errors.name }"
            />
            <span v-if="form.errors.name" class="error-message">{{ form.errors.name }}</span>
          </div>
          
          <div class="form-group">
            <label>邮箱:</label>
            <input 
              v-model="form.formData.email" 
              placeholder="请输入邮箱"
              :class="{ error: form.errors.email }"
            />
            <span v-if="form.errors.email" class="error-message">{{ form.errors.email }}</span>
          </div>
          
          <div class="form-group">
            <label>年龄:</label>
            <input 
              v-model="form.formData.age" 
              placeholder="请输入年龄"
              :class="{ error: form.errors.age }"
            />
            <span v-if="form.errors.age" class="error-message">{{ form.errors.age }}</span>
          </div>
          
          <div class="form-status">
            <p>表单状态: 
              <span :class="form.isValid ? 'valid' : 'invalid'">
                {{ form.isValid ? '✅ 有效' : '❌ 无效' }}
              </span>
            </p>
            <p>是否修改过: {{ form.isDirty ? '是' : '否' }}</p>
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              :disabled="!form.canSubmit"
              class="btn-primary"
            >
              {{ form.submitting ? '提交中...' : '提交' }}
            </button>
            <button type="button" @click="form.reset()" class="btn-secondary">
              重置
            </button>
          </div>
        </form>

        <div class="code-explanation">
          <h4>🔍 表单Hook的优势：</h4>
          <ul class="advantages">
            <li><strong>自动验证</strong>: 输入时自动验证，提供即时反馈</li>
            <li><strong>状态管理</strong>: 自动管理表单的各种状态(有效性、是否修改等)</li>
            <li><strong>灵活的验证规则</strong>: 支持自定义验证规则组合</li>
            <li><strong>提交流程</strong>: 统一的提交状态管理和错误处理</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Hooks 总结 -->
    <section class="demo-section">
      <h2>🎯 Hooks (Composables) 的核心优势</h2>
      
      <div class="advantages-grid">
        <div class="advantage-card">
          <h3>🔄 代码复用</h3>
          <p>将通用逻辑抽取成hook，可以在多个组件间复用，避免重复代码</p>
        </div>
        
        <div class="advantage-card">
          <h3>🧩 逻辑分离</h3>
          <p>将相关功能聚合在一起，组件代码更清晰，职责更明确</p>
        </div>
        
        <div class="advantage-card">
          <h3>🧪 易于测试</h3>
          <p>hook是独立的函数，可以单独测试，提高代码的可测试性</p>
        </div>
        
        <div class="advantage-card">
          <h3>🔧 易于维护</h3>
          <p>业务逻辑集中管理，修改时只需要修改一个地方</p>
        </div>
        
        <div class="advantage-card">
          <h3>⚡ 性能优化</h3>
          <p>Vue的响应式系统自动优化，只有相关状态变化时才会重新渲染</p>
        </div>
        
        <div class="advantage-card">
          <h3>🎨 灵活组合</h3>
          <p>可以组合多个hooks，构建复杂的功能，保持代码模块化</p>
        </div>
      </div>

      <div class="best-practices">
        <h3>📋 Hooks 最佳实践</h3>
        <ul>
          <li><strong>命名规范</strong>: 以 <code>use</code> 开头，如 <code>useCounter</code>、<code>useApi</code></li>
          <li><strong>单一职责</strong>: 每个hook只负责一个功能域，保持职责单一</li>
          <li><strong>返回对象</strong>: 返回包含状态和方法的对象，方便解构使用</li>
          <li><strong>参数化</strong>: 通过参数让hook更灵活，支持不同的使用场景</li>
          <li><strong>错误处理</strong>: 在hook内部处理错误，提供一致的错误体验</li>
          <li><strong>TypeScript支持</strong>: 为hook提供类型定义，提高开发体验</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCounter } from '@/composables/useCounter.js'
import { useHealthCheck, useHelloApi } from '@/composables/useApi.js'
import { useForm, validationRules } from '@/composables/useForm.js'

// =============================================
// Counter Hook演示
// =============================================
// 创建两个独立的计数器实例，展示hook的复用性
const counter1 = useCounter(0, 1)  // 初始值0, 步长1
const counter2 = useCounter(10, 5) // 初始值10, 步长5

// =============================================
// API Hook演示
// =============================================
// 健康检查hook
const health = useHealthCheck()

// 问候API hook
const hello = useHelloApi()
const helloName = ref('Vue开发者')

// =============================================
// Form Hook演示
// =============================================
// 创建表单hook实例
const form = useForm(
  // 初始值
  {
    name: '',
    email: '',
    age: ''
  },
  // 验证规则
  {
    name: [
      validationRules.required('请输入姓名'),
      validationRules.minLength(2, '姓名至少2个字符')
    ],
    email: [
      validationRules.required('请输入邮箱'),
      validationRules.email()
    ],
    age: [
      validationRules.required('请输入年龄'),
      validationRules.positiveInteger()
    ]
  }
)

// 表单提交处理
const onSubmit = () => {
  form.handleSubmit(async (data) => {
    console.log('📝 表单提交数据:', data)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('✅ 表单提交成功!')
    alert(`注册成功！欢迎 ${data.name}`)
    
    // 提交成功后重置表单
    form.reset()
  }).catch(error => {
    console.error('❌ 表单提交失败:', error)
  })
}

// =============================================
// 组件挂载时的初始化
// =============================================
onMounted(() => {
  console.log('🎣 Hooks Demo 页面加载完成')
  console.log('💡 这个页面展示了Vue 3 Composables (Hooks) 的强大功能')
  
  // 自动检查服务器状态
  health.checkHealth()
})
</script>

<style scoped>
.hooks-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.description {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
  text-align: center;
}

.demo-section {
  margin-bottom: 40px;
  padding: 25px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: #fafafa;
}

.demo-section h2 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 3px solid #42b983;
  padding-bottom: 12px;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.demo-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.demo-box h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  border-left: 4px solid #42b983;
  padding-left: 10px;
}

.counter-display {
  text-align: center;
  margin: 20px 0;
}

.count-number {
  font-size: 48px;
  font-weight: bold;
  color: #42b983;
  display: inline-block;
  min-width: 80px;
}

.status, .computed {
  margin: 8px 0;
  font-size: 14px;
}

.status {
  color: #666;
  font-style: italic;
}

.computed {
  color: #007bff;
  font-weight: 500;
}

.controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 15px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary { background: #007bff; color: white; }
.btn-success { background: #28a745; color: white; }
.btn-danger { background: #dc3545; color: white; }
.btn-warning { background: #ffc107; color: #212529; }
.btn-info { background: #17a2b8; color: white; }
.btn-secondary { background: #6c757d; color: white; }

button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.server-status {
  text-align: center;
  margin: 15px 0;
}

.health-info {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.api-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.response-box {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 15px;
  margin-top: 15px;
}

.response-box h4 {
  color: #28a745;
  margin-bottom: 10px;
}

.response-box pre {
  background: #f1f3f4;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.4;
  overflow-x: auto;
  margin: 0;
}

.demo-form {
  max-width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

.form-group input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.form-status {
  margin: 20px 0;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
}

.form-status .valid {
  color: #28a745;
  font-weight: 500;
}

.form-status .invalid {
  color: #dc3545;
  font-weight: 500;
}

.form-actions {
  display: flex;
  gap: 10px;
}

.code-explanation {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.code-explanation h4 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.before, .after {
  padding: 15px;
  border-radius: 6px;
}

.before {
  background: #fff5f5;
  border: 1px solid #fed7d7;
}

.after {
  background: #f0fff4;
  border: 1px solid #c6f6d5;
}

.before h5 {
  color: #c53030;
  margin-bottom: 10px;
}

.after h5 {
  color: #38a169;
  margin-bottom: 10px;
}

pre code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.4;
}

.advantages {
  list-style: none;
  padding: 0;
}

.advantages li {
  margin: 10px 0;
  padding: 10px;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #42b983;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.advantage-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-top: 4px solid #42b983;
}

.advantage-card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.advantage-card p {
  color: #666;
  line-height: 1.6;
}

.best-practices {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.best-practices h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.best-practices ul {
  list-style: none;
  padding: 0;
}

.best-practices li {
  margin: 12px 0;
  padding: 10px 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #17a2b8;
}

.best-practices code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', monospace;
  color: #e83e8c;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-grid, .comparison, .advantages-grid {
    grid-template-columns: 1fr;
  }
  
  .api-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .controls {
    flex-direction: column;
  }
}
</style>