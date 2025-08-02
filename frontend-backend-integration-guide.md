# Vue 3 + Go Gin 前后端集成指南

## 🎯 项目概述

这是一个完整的前后端分离项目演示，展示了Vue 3前端如何调用Go Gin后端API。

## 📁 项目结构

```
learnVue/
├── my-first-vue-app/        # 前端Vue 3项目
│   ├── src/views/ApiDemo.vue  # API调用演示页面
│   └── ...
└── api-backend/             # 后端Go项目
    ├── main.go              # Gin服务器和API接口
    └── go.mod               # Go模块配置
```

## 🚀 启动步骤

### 1. 启动后端Go服务器

```bash
# 进入后端项目目录
cd /Users/link/workspace/learnVue/api-backend

# 安装Go依赖（如果还没安装）
go mod tidy

# 启动Go服务器
go run main.go
```

**后端服务信息：**
- 🌐 服务地址: http://localhost:8080
- 🔗 健康检查: http://localhost:8080/api/v1/health
- ✅ 跨域支持: 已配置CORS，支持前端开发服务器

### 2. 启动前端Vue项目

```bash
# 打开新的终端窗口
# 进入前端项目目录
cd /Users/link/workspace/learnVue/my-first-vue-app

# 启动Vue开发服务器
npm run dev
```

**前端服务信息：**
- 🌐 访问地址: http://localhost:5173
- 🎯 API演示页面: http://localhost:5173/api-demo
- 📦 HTTP客户端: axios

## 🔗 API接口列表

### 健康检查接口
```http
GET /api/v1/health
```
**响应示例：**
```json
{
  "code": 200,
  "message": "API服务器运行正常",
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "timestamp": "2025-08-02 14:30:00"
  }
}
```

### SayHello GET接口
```http
GET /api/v1/hello?name=YourName
```
**响应示例：**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "greeting": "Hello, YourName! 👋",
    "timestamp": "2025-08-02 14:30:00",
    "from": "Go Gin API Server"
  }
}
```

### SayHello POST接口
```http
POST /api/v1/hello
Content-Type: application/json

{
  "name": "YourName"
}
```
**响应示例：**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "greeting": "Hello, YourName! 🎉",
    "timestamp": "2025-08-02 14:30:00",
    "from": "Go Gin API Server (POST)"
  }
}
```

### 获取用户信息接口
```http
GET /api/v1/user/{id}
```
**响应示例：**
```json
{
  "code": 200,
  "message": "获取用户信息成功",
  "data": {
    "id": "1",
    "name": "用户1",
    "email": "user1@example.com",
    "avatar": "https://avatars.githubusercontent.com/u/1",
    "role": "user",
    "status": "active"
  }
}
```

## 💻 前端调用示例

### 安装axios依赖
```bash
npm install axios
```

### Vue 3组件中调用API

```vue
<script setup>
import axios from 'axios'
import { ref } from 'vue'

const API_BASE_URL = 'http://localhost:8080/api/v1'
const response = ref(null)

// GET请求示例
const sayHelloGET = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/hello`, {
      params: { name: 'Vue用户' }
    })
    response.value = result.data
    console.log('GET响应:', result.data)
  } catch (error) {
    console.error('请求失败:', error)
  }
}

// POST请求示例
const sayHelloPOST = async () => {
  try {
    const result = await axios.post(`${API_BASE_URL}/hello`, {
      name: 'Vue开发者'
    })
    response.value = result.data
    console.log('POST响应:', result.data)
  } catch (error) {
    console.error('请求失败:', error)
  }
}
</script>

<template>
  <div>
    <button @click="sayHelloGET">发送GET请求</button>
    <button @click="sayHelloPOST">发送POST请求</button>
    <pre v-if="response">{{ JSON.stringify(response, null, 2) }}</pre>
  </div>
</template>
```

## 🔧 技术要点

### 1. 跨域问题解决 (CORS)

**后端Go代码配置：**
```go
import "github.com/gin-contrib/cors"

// 配置CORS中间件
r.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://localhost:5173"},
    AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
    AllowCredentials: true,
    MaxAge:           12 * time.Hour,
}))
```

### 2. 统一响应格式

**Go后端响应结构：**
```go
type Response struct {
    Code    int         `json:"code"`
    Message string      `json:"message"`
    Data    interface{} `json:"data"`
}
```

### 3. axios错误处理

**前端拦截器配置：**
```javascript
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNREFUSED') {
      console.error('无法连接到后端服务器')
    }
    return Promise.reject(error)
  }
)
```

## 🧪 测试流程

### 1. 基础连接测试
1. 启动Go后端服务器
2. 访问 http://localhost:8080/api/v1/health
3. 确认返回健康状态JSON

### 2. 前端集成测试
1. 启动Vue前端项目
2. 访问 http://localhost:5173/api-demo
3. 点击"检查状态"按钮，确认服务器在线
4. 测试各种API调用功能

### 3. 浏览器开发者工具
- 🔍 **Network标签**: 查看HTTP请求和响应
- 📝 **Console标签**: 查看axios日志和错误信息
- 🛠️ **Application标签**: 查看本地存储等

## ❗ 常见问题

### Q1: 前端无法连接后端
**解决方案：**
1. 确认Go服务器已启动 (端口8080)
2. 检查防火墙设置
3. 确认CORS配置正确

### Q2: axios请求超时
**解决方案：**
```javascript
axios.defaults.timeout = 10000  // 增加超时时间
```

### Q3: JSON解析错误
**解决方案：**
1. 检查Content-Type头部设置
2. 确认请求体格式正确
3. 查看Go服务器日志

## 🎯 学习收获

通过这个项目你将学会：

### 前端技能
- ✅ Vue 3 + axios HTTP请求
- ✅ 响应式数据处理
- ✅ 错误处理和用户反馈
- ✅ 异步编程实践

### 后端技能
- ✅ Go + Gin框架API开发
- ✅ CORS跨域配置
- ✅ JSON响应格式设计
- ✅ RESTful API设计

### 集成技能
- ✅ 前后端分离架构
- ✅ HTTP协议实践
- ✅ 调试和问题排查
- ✅ 开发环境配置

## 🔄 扩展功能建议

1. **身份认证** - JWT Token验证
2. **数据库集成** - MySQL/PostgreSQL
3. **文件上传** - 图片和文档上传
4. **实时通信** - WebSocket集成
5. **容器化部署** - Docker容器化
6. **API文档** - Swagger自动生成

---

**🎉 恭喜！你已经掌握了Vue 3前端调用Go后端API的完整流程！**

*文档创建时间: 2025-08-02*