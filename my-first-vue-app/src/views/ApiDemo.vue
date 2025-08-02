<template>
  <div class="api-demo">
    <h1>前后端API调用演示</h1>
    <p class="description">演示Vue 3前端如何调用Go Gin后端API</p>
    
    <!-- 服务器状态 -->
    <el-card class="status-card" shadow="never">
      <template #header>
        <div class="card-header">
          <span>🔗 后端服务状态</span>
          <el-button @click="checkHealth" :loading="healthLoading" size="small">
            检查状态
          </el-button>
        </div>
      </template>
      <div class="server-status">
        <el-tag :type="serverOnline ? 'success' : 'danger'" size="large">
          {{ serverOnline ? '✅ 服务器在线' : '❌ 服务器离线' }}
        </el-tag>
        <p v-if="healthData" class="health-info">
          <strong>版本:</strong> {{ healthData.version }}<br>
          <strong>状态:</strong> {{ healthData.status }}<br>
          <strong>时间:</strong> {{ healthData.timestamp }}
        </p>
      </div>
    </el-card>

    <!-- GET请求演示 -->
    <el-card class="demo-card" shadow="never">
      <template #header>
        <span>📤 GET请求演示</span>
      </template>
      
      <div class="demo-section">
        <h3>SayHello GET请求</h3>
        <div class="input-group">
          <el-input
            v-model="getName"
            placeholder="请输入你的名字"
            style="width: 200px; margin-right: 10px;"
          />
          <el-button type="primary" @click="sayHelloGET" :loading="getLoading">
            发送GET请求
          </el-button>
        </div>
        
        <div v-if="getResponse" class="response-box">
          <h4>📥 响应结果:</h4>
          <pre>{{ JSON.stringify(getResponse, null, 2) }}</pre>
        </div>
      </div>
    </el-card>

    <!-- POST请求演示 -->
    <el-card class="demo-card" shadow="never">
      <template #header>
        <span>📤 POST请求演示</span>
      </template>
      
      <div class="demo-section">
        <h3>SayHello POST请求</h3>
        <div class="input-group">
          <el-input
            v-model="postName"
            placeholder="请输入你的名字"
            style="width: 200px; margin-right: 10px;"
          />
          <el-button type="success" @click="sayHelloPOST" :loading="postLoading">
            发送POST请求
          </el-button>
        </div>
        
        <div v-if="postResponse" class="response-box">
          <h4>📥 响应结果:</h4>
          <pre>{{ JSON.stringify(postResponse, null, 2) }}</pre>
        </div>
      </div>
    </el-card>

    <!-- 用户信息演示 -->
    <el-card class="demo-card" shadow="never">
      <template #header>
        <span>👤 获取用户信息演示</span>
      </template>
      
      <div class="demo-section">
        <h3>获取用户信息</h3>
        <div class="input-group">
          <el-input
            v-model="userId"
            placeholder="请输入用户ID"
            style="width: 200px; margin-right: 10px;"
          />
          <el-button type="warning" @click="getUser" :loading="userLoading">
            获取用户信息
          </el-button>
        </div>
        
        <div v-if="userResponse" class="response-box">
          <h4>📥 用户信息:</h4>
          <div class="user-info">
            <el-avatar :src="userResponse.data.avatar" :size="60" />
            <div class="user-details">
              <p><strong>ID:</strong> {{ userResponse.data.id }}</p>
              <p><strong>姓名:</strong> {{ userResponse.data.name }}</p>
              <p><strong>邮箱:</strong> {{ userResponse.data.email }}</p>
              <p><strong>角色:</strong> {{ userResponse.data.role }}</p>
              <p><strong>状态:</strong> {{ userResponse.data.status }}</p>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- API接口文档 -->
    <el-card class="demo-card" shadow="never">
      <template #header>
        <span>📋 API接口文档</span>
      </template>
      
      <div class="api-docs">
        <h3>可用接口列表</h3>
        <ul class="api-list">
          <li>
            <code>GET /api/v1/hello?name=YourName</code>
            <span class="api-desc">GET方式问候接口</span>
          </li>
          <li>
            <code>POST /api/v1/hello</code>
            <span class="api-desc">POST方式问候接口 (JSON: {"name": "YourName"})</span>
          </li>
          <li>
            <code>GET /api/v1/user/:id</code>
            <span class="api-desc">获取用户信息接口</span>
          </li>
          <li>
            <code>GET /api/v1/health</code>
            <span class="api-desc">健康检查接口</span>
          </li>
        </ul>
        
        <div class="server-info">
          <h4>🖥️ 后端服务信息</h4>
          <p><strong>服务地址:</strong> http://localhost:8080</p>
          <p><strong>框架:</strong> Go + Gin</p>
          <p><strong>跨域支持:</strong> 已配置CORS</p>
          <p><strong>启动命令:</strong> <code>cd api-backend && go run main.go</code></p>
        </div>
      </div>
    </el-card>

    <!-- 错误信息显示 -->
    <el-alert
      v-if="errorMessage"
      :title="errorMessage"
      type="error"
      :closable="true"
      @close="errorMessage = ''"
      class="error-alert"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// API基础URL
const API_BASE_URL = 'http://localhost:8080/api/v1'

// 响应式数据
const serverOnline = ref(false)
const healthData = ref(null)
const healthLoading = ref(false)

const getName = ref('Vue用户')
const getResponse = ref(null)
const getLoading = ref(false)

const postName = ref('Vue开发者')
const postResponse = ref(null)
const postLoading = ref(false)

const userId = ref('1')
const userResponse = ref(null)
const userLoading = ref(false)

const errorMessage = ref('')

// 配置axios默认设置
axios.defaults.timeout = 5000
axios.defaults.headers.common['Content-Type'] = 'application/json'

// 响应拦截器 - 统一处理响应
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.error('API请求错误:', error)
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      errorMessage.value = '⚠️ 无法连接到后端服务器，请确保Go服务器已启动 (端口8080)'
      serverOnline.value = false
    } else {
      errorMessage.value = `请求失败: ${error.message}`
    }
    return Promise.reject(error)
  }
)

// 检查服务器健康状态
const checkHealth = async () => {
  healthLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await axios.get(`${API_BASE_URL}/health`)
    healthData.value = response.data.data
    serverOnline.value = true
    ElMessage.success('服务器连接成功！')
    console.log('健康检查响应:', response.data)
  } catch (error) {
    serverOnline.value = false
    healthData.value = null
  } finally {
    healthLoading.value = false
  }
}

// GET请求示例
const sayHelloGET = async () => {
  if (!getName.value.trim()) {
    ElMessage.warning('请输入你的名字')
    return
  }
  
  getLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await axios.get(`${API_BASE_URL}/hello`, {
      params: {
        name: getName.value
      }
    })
    getResponse.value = response.data
    ElMessage.success('GET请求成功！')
    console.log('GET请求响应:', response.data)
  } catch (error) {
    getResponse.value = null
  } finally {
    getLoading.value = false
  }
}

// POST请求示例
const sayHelloPOST = async () => {
  if (!postName.value.trim()) {
    ElMessage.warning('请输入你的名字')
    return
  }
  
  postLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await axios.post(`${API_BASE_URL}/hello`, {
      name: postName.value
    })
    postResponse.value = response.data
    ElMessage.success('POST请求成功！')
    console.log('POST请求响应:', response.data)
  } catch (error) {
    postResponse.value = null
  } finally {
    postLoading.value = false
  }
}

// 获取用户信息
const getUser = async () => {
  if (!userId.value.trim()) {
    ElMessage.warning('请输入用户ID')
    return
  }
  
  userLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId.value}`)
    userResponse.value = response.data
    ElMessage.success('获取用户信息成功！')
    console.log('用户信息响应:', response.data)
  } catch (error) {
    userResponse.value = null
  } finally {
    userLoading.value = false
  }
}

// 页面加载时检查服务器状态
onMounted(() => {
  checkHealth()
})
</script>

<style scoped>
.api-demo {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.description {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
  text-align: center;
}

.status-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.server-status {
  text-align: center;
  padding: 20px;
}

.health-info {
  margin-top: 15px;
  color: #666;
  line-height: 1.6;
}

.demo-card {
  margin-bottom: 20px;
}

.demo-section h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
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

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.user-details p {
  margin: 5px 0;
  color: #555;
}

.api-docs {
  padding: 10px;
}

.api-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.api-list li {
  margin: 10px 0;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #007bff;
}

.api-list code {
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #d73a49;
}

.api-desc {
  margin-left: 15px;
  color: #666;
  font-size: 14px;
}

.server-info {
  background: #e8f5e8;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
}

.server-info h4 {
  color: #28a745;
  margin-bottom: 10px;
}

.server-info p {
  margin: 8px 0;
  color: #555;
}

.server-info code {
  background: #f1f3f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

.error-alert {
  margin-top: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .user-info {
    flex-direction: column;
    text-align: center;
  }
}
</style>