// =============================================
// API请求Hook - HTTP请求逻辑封装
// =============================================
// 这个hook演示了如何将API调用逻辑抽取成可复用的hook
// 
// 主要功能：
// 1. 统一的加载状态管理
// 2. 错误处理和错误状态管理
// 3. 响应数据管理
// 4. 请求拦截器和响应拦截器配置
// 5. 支持GET、POST、PUT、DELETE等HTTP方法
// =============================================

import { ref, computed } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// API基础配置
const API_BASE_URL = 'http://localhost:8080/api/v1'

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 基础API请求Hook
 * @returns {object} 返回请求状态和方法
 */
export function useApi() {
  // =============================================
  // 状态管理
  // =============================================
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  // =============================================
  // 计算属性
  // =============================================
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)
  const hasData = computed(() => data.value !== null)

  // =============================================
  // 通用请求方法
  // =============================================
  
  /**
   * 执行HTTP请求
   * @param {Function} requestFn - axios请求函数
   * @param {object} options - 请求选项
   */
  const request = async (requestFn, options = {}) => {
    const { 
      showLoading = true, 
      showSuccess = true, 
      showError = true,
      successMessage = '请求成功',
      errorMessage = '请求失败'
    } = options

    if (showLoading) loading.value = true
    error.value = null

    try {
      const response = await requestFn()
      data.value = response.data
      
      if (showSuccess) {
        ElMessage.success(successMessage)
      }
      
      return response.data
    } catch (err) {
      error.value = err.message || errorMessage
      
      if (showError) {
        if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
          ElMessage.error('⚠️ 无法连接到后端服务器，请确保服务器已启动')
        } else {
          ElMessage.error(error.value)
        }
      }
      
      throw err
    } finally {
      if (showLoading) loading.value = false
    }
  }

  /**
   * GET请求
   * @param {string} url - 请求URL
   * @param {object} params - 查询参数
   * @param {object} options - 请求选项
   */
  const get = async (url, params = {}, options = {}) => {
    return request(() => apiClient.get(url, { params }), options)
  }

  /**
   * POST请求
   * @param {string} url - 请求URL
   * @param {object} data - 请求数据
   * @param {object} options - 请求选项
   */
  const post = async (url, postData = {}, options = {}) => {
    return request(() => apiClient.post(url, postData), options)
  }

  /**
   * PUT请求
   * @param {string} url - 请求URL
   * @param {object} data - 请求数据
   * @param {object} options - 请求选项
   */
  const put = async (url, putData = {}, options = {}) => {
    return request(() => apiClient.put(url, putData), options)
  }

  /**
   * DELETE请求
   * @param {string} url - 请求URL
   * @param {object} options - 请求选项
   */
  const del = async (url, options = {}) => {
    return request(() => apiClient.delete(url), options)
  }

  /**
   * 清除错误状态
   */
  const clearError = () => {
    error.value = null
  }

  /**
   * 清除数据
   */
  const clearData = () => {
    data.value = null
  }

  /**
   * 重置所有状态
   */
  const reset = () => {
    loading.value = false
    error.value = null
    data.value = null
  }

  // =============================================
  // 返回hook的所有功能
  // =============================================
  return {
    // 状态
    loading,
    error,
    data,
    
    // 计算属性
    isLoading,
    hasError,
    hasData,
    
    // 请求方法
    request,
    get,
    post,
    put,
    delete: del,
    
    // 工具方法
    clearError,
    clearData,
    reset
  }
}

/**
 * 健康检查Hook
 * @returns {object} 返回健康检查状态和方法
 */
export function useHealthCheck() {
  const { loading, error, data, get } = useApi()
  
  const serverOnline = computed(() => data.value !== null && !error.value)
  const healthData = computed(() => data.value?.data || null)

  const checkHealth = async () => {
    try {
      await get('/health', {}, {
        successMessage: '服务器连接成功！',
        errorMessage: '服务器连接失败'
      })
    } catch (err) {
      console.error('健康检查失败:', err)
    }
  }

  return {
    loading,
    error,
    serverOnline,
    healthData,
    checkHealth
  }
}

/**
 * 问候API Hook
 * @returns {object} 返回问候API的状态和方法
 */
export function useHelloApi() {
  const { loading, data, get, post } = useApi()

  const sayHelloGET = async (name) => {
    if (!name?.trim()) {
      ElMessage.warning('请输入你的名字')
      return
    }
    
    return await get('/hello', { name }, {
      successMessage: 'GET请求成功！'
    })
  }

  const sayHelloPOST = async (name) => {
    if (!name?.trim()) {
      ElMessage.warning('请输入你的名字')
      return
    }
    
    return await post('/hello', { name }, {
      successMessage: 'POST请求成功！'
    })
  }

  return {
    loading,
    response: data,
    sayHelloGET,
    sayHelloPOST
  }
}

/**
 * 用户API Hook
 * @returns {object} 返回用户API的状态和方法
 */
export function useUserApi() {
  const { loading, data, error, get } = useApi()

  const getUser = async (userId) => {
    if (!userId?.toString().trim()) {
      ElMessage.warning('请输入用户ID')
      return
    }
    
    return await get(`/user/${userId}`, {}, {
      successMessage: '获取用户信息成功！'
    })
  }

  const userInfo = computed(() => data.value?.data || null)

  return {
    loading,
    error,
    userInfo,
    response: data,
    getUser
  }
}

// =============================================
// Hook使用示例
// =============================================
/*
在组件中使用：

<script setup>
import { useHealthCheck, useHelloApi, useUserApi } from '@/composables/useApi.js'

// 健康检查
const { serverOnline, healthData, checkHealth } = useHealthCheck()

// 问候API
const { 
  loading: helloLoading, 
  response: helloResponse, 
  sayHelloGET, 
  sayHelloPOST 
} = useHelloApi()

// 用户API
const { 
  loading: userLoading, 
  userInfo, 
  getUser 
} = useUserApi()

// 在组件挂载时检查健康状态
onMounted(() => {
  checkHealth()
})
</script>

<template>
  <div>
    <!-- 服务器状态 -->
    <p>服务器状态: {{ serverOnline ? '在线' : '离线' }}</p>
    
    <!-- 问候功能 -->
    <button @click="sayHelloGET('Vue用户')" :loading="helloLoading">
      发送GET问候
    </button>
    
    <!-- 用户信息 -->
    <button @click="getUser(1)" :loading="userLoading">
      获取用户信息
    </button>
    <div v-if="userInfo">
      <p>用户名: {{ userInfo.name }}</p>
      <p>邮箱: {{ userInfo.email }}</p>
    </div>
  </div>
</template>
*/