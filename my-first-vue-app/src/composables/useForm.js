// =============================================
// 表单处理Hook - 表单状态和验证逻辑封装
// =============================================
// 这个hook演示了如何将表单处理逻辑抽取成可复用的hook
// 
// 主要功能：
// 1. 表单数据的响应式管理
// 2. 表单验证逻辑
// 3. 提交状态管理
// 4. 错误信息管理
// 5. 表单重置功能
// 6. 支持自定义验证规则
// =============================================

import { ref, reactive, computed, watch } from 'vue'

/**
 * 基础表单Hook
 * @param {object} initialValues - 表单初始值
 * @param {object} validationRules - 验证规则
 * @returns {object} 返回表单状态和方法
 */
export function useForm(initialValues = {}, validationRules = {}) {
  // =============================================
  // 状态管理
  // =============================================
  const formData = reactive({ ...initialValues })
  const errors = reactive({})
  const touched = reactive({})
  const submitting = ref(false)
  const submitted = ref(false)

  // =============================================
  // 计算属性
  // =============================================
  const isValid = computed(() => {
    return Object.keys(errors).length === 0
  })

  const hasErrors = computed(() => {
    return Object.keys(errors).length > 0
  })

  const isDirty = computed(() => {
    return Object.keys(touched).length > 0
  })

  const canSubmit = computed(() => {
    return isValid.value && !submitting.value
  })

  // =============================================
  // 验证方法
  // =============================================

  /**
   * 验证单个字段
   * @param {string} fieldName - 字段名
   * @param {any} value - 字段值
   */
  const validateField = (fieldName, value) => {
    const rules = validationRules[fieldName]
    if (!rules) return

    // 清除旧的错误信息
    delete errors[fieldName]

    // 如果是数组规则，依次验证
    const ruleArray = Array.isArray(rules) ? rules : [rules]
    
    for (const rule of ruleArray) {
      const errorMessage = rule(value, formData)
      if (errorMessage) {
        errors[fieldName] = errorMessage
        break
      }
    }
  }

  /**
   * 验证所有字段
   */
  const validateForm = () => {
    Object.keys(formData).forEach(fieldName => {
      validateField(fieldName, formData[fieldName])
    })
  }

  // =============================================
  // 表单操作方法
  // =============================================

  /**
   * 设置字段值
   * @param {string} fieldName - 字段名
   * @param {any} value - 字段值
   */
  const setValue = (fieldName, value) => {
    formData[fieldName] = value
    touched[fieldName] = true
    validateField(fieldName, value)
  }

  /**
   * 设置字段错误信息
   * @param {string} fieldName - 字段名
   * @param {string} errorMessage - 错误信息
   */
  const setError = (fieldName, errorMessage) => {
    errors[fieldName] = errorMessage
  }

  /**
   * 清除字段错误信息
   * @param {string} fieldName - 字段名
   */
  const clearError = (fieldName) => {
    delete errors[fieldName]
  }

  /**
   * 清除所有错误信息
   */
  const clearErrors = () => {
    Object.keys(errors).forEach(key => {
      delete errors[key]
    })
  }

  /**
   * 重置表单
   */
  const reset = () => {
    // 重置数据
    Object.keys(formData).forEach(key => {
      formData[key] = initialValues[key] || ''
    })
    
    // 清除状态
    clearErrors()
    Object.keys(touched).forEach(key => {
      delete touched[key]
    })
    
    submitting.value = false
    submitted.value = false
  }

  /**
   * 处理表单提交
   * @param {Function} submitHandler - 提交处理函数
   */
  const handleSubmit = async (submitHandler) => {
    submitted.value = true
    validateForm()

    if (!isValid.value) {
      console.warn('表单验证失败:', errors)
      return false
    }

    submitting.value = true

    try {
      const result = await submitHandler(formData)
      return result
    } catch (error) {
      console.error('表单提交失败:', error)
      throw error
    } finally {
      submitting.value = false
    }
  }

  // =============================================
  // 监听表单数据变化
  // =============================================
  Object.keys(formData).forEach(fieldName => {
    watch(
      () => formData[fieldName],
      (newValue) => {
        if (touched[fieldName]) {
          validateField(fieldName, newValue)
        }
      }
    )
  })

  // =============================================
  // 返回hook的所有功能
  // =============================================
  return {
    // 状态
    formData,
    errors,
    touched,
    submitting,
    submitted,

    // 计算属性
    isValid,
    hasErrors,
    isDirty,
    canSubmit,

    // 方法
    setValue,
    setError,
    clearError,
    clearErrors,
    validateField,
    validateForm,
    reset,
    handleSubmit
  }
}

/**
 * 输入框Hook
 * @param {string} initialValue - 初始值
 * @param {object} options - 选项配置
 * @returns {object} 返回输入框状态和方法
 */
export function useInput(initialValue = '', options = {}) {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    trim = true,
    maxLength = null
  } = options

  const value = ref(initialValue)
  const error = ref('')
  const touched = ref(false)
  const focused = ref(false)

  const isEmpty = computed(() => {
    const val = trim ? value.value.trim() : value.value
    return val === ''
  })

  const isValid = computed(() => error.value === '')

  const setValue = (newValue) => {
    if (maxLength && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength)
    }
    
    value.value = newValue
    
    if (validateOnChange && touched.value) {
      // 这里可以添加验证逻辑
    }
  }

  const onFocus = () => {
    focused.value = true
  }

  const onBlur = () => {
    focused.value = false
    touched.value = true
    
    if (validateOnBlur) {
      // 这里可以添加验证逻辑
    }
  }

  const reset = () => {
    value.value = initialValue
    error.value = ''
    touched.value = false
    focused.value = false
  }

  return {
    value,
    error,
    touched,
    focused,
    isEmpty,
    isValid,
    setValue,
    onFocus,
    onBlur,
    reset
  }
}

// =============================================
// 常用验证规则
// =============================================

export const validationRules = {
  /**
   * 必填验证
   * @param {string} message - 错误信息
   */
  required: (message = '此字段为必填项') => (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return message
    }
    return null
  },

  /**
   * 最小长度验证
   * @param {number} min - 最小长度
   * @param {string} message - 错误信息
   */
  minLength: (min, message) => (value) => {
    if (value && value.length < min) {
      return message || `最少需要${min}个字符`
    }
    return null
  },

  /**
   * 最大长度验证
   * @param {number} max - 最大长度
   * @param {string} message - 错误信息
   */
  maxLength: (max, message) => (value) => {
    if (value && value.length > max) {
      return message || `最多只能输入${max}个字符`
    }
    return null
  },

  /**
   * 邮箱格式验证
   * @param {string} message - 错误信息
   */
  email: (message = '请输入有效的邮箱地址') => (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return message
    }
    return null
  },

  /**
   * 数字验证
   * @param {string} message - 错误信息
   */
  number: (message = '请输入有效的数字') => (value) => {
    if (value && isNaN(Number(value))) {
      return message
    }
    return null
  },

  /**
   * 正整数验证
   * @param {string} message - 错误信息
   */
  positiveInteger: (message = '请输入正整数') => (value) => {
    if (value && (!Number.isInteger(Number(value)) || Number(value) <= 0)) {
      return message
    }
    return null
  }
}

// =============================================
// Hook使用示例
// =============================================
/*
在组件中使用：

<script setup>
import { useForm, useInput, validationRules } from '@/composables/useForm.js'

// 使用表单Hook
const {
  formData,
  errors,
  isValid,
  canSubmit,
  handleSubmit,
  reset
} = useForm(
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

// 使用输入框Hook
const { 
  value: searchKeyword, 
  isEmpty: isSearchEmpty,
  setValue: setSearchKeyword 
} = useInput('', { 
  trim: true, 
  maxLength: 50 
})

// 表单提交处理
const onSubmit = () => {
  handleSubmit(async (data) => {
    console.log('提交数据:', data)
    // 这里可以调用API
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('提交成功')
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input 
        v-model="formData.name" 
        placeholder="请输入姓名"
        :class="{ error: errors.name }"
      />
      <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
    </div>
    
    <div>
      <input 
        v-model="formData.email" 
        placeholder="请输入邮箱"
        :class="{ error: errors.email }"
      />
      <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
    </div>
    
    <div>
      <input 
        v-model="formData.age" 
        placeholder="请输入年龄"
        :class="{ error: errors.age }"
      />
      <span v-if="errors.age" class="error-message">{{ errors.age }}</span>
    </div>
    
    <button type="submit" :disabled="!canSubmit">
      {{ submitting ? '提交中...' : '提交' }}
    </button>
    <button type="button" @click="reset">重置</button>
  </form>
</template>
*/