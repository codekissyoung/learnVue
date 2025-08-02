// Mini Vue 3 响应式系统实现
// 这是一个简化但完整的Vue 3响应式系统实现

'use strict'

console.log('🚀 Mini Vue 3 响应式系统启动...\n')

// ==================== 核心响应式系统 ====================

// 存储依赖关系的全局WeakMap
// 结构: WeakMap<target, Map<key, Set<ReactiveEffect>>>
const targetMap = new WeakMap()

// 当前激活的副作用函数
let activeEffect = undefined

// 副作用函数栈，用于处理嵌套的effect
const effectStack = []

/**
 * ReactiveEffect类 - 副作用函数的包装器
 */
class ReactiveEffect {
  constructor(fn, scheduler = null) {
    this.fn = fn                // 原始副作用函数
    this.scheduler = scheduler  // 调度器函数
    this.active = true         // 是否激活
    this.deps = []            // 存储所有依赖当前effect的集合
  }
  
  run() {
    if (!this.active) {
      return this.fn()
    }
    
    try {
      // 入栈
      effectStack.push(this)
      activeEffect = this
      
      // 清理之前收集的依赖
      cleanupEffect(this)
      
      // 执行函数，期间会重新收集依赖
      return this.fn()
    } finally {
      // 出栈
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  
  stop() {
    if (this.active) {
      cleanupEffect(this)
      this.active = false
    }
  }
}

/**
 * 清理effect的所有依赖
 */
function cleanupEffect(effect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

/**
 * 依赖收集函数
 */
function track(target, key) {
  // 如果没有活跃的effect，直接返回
  if (!activeEffect) return
  
  // 获取target对应的依赖映射
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  
  // 获取key对应的依赖集合
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  
  // 如果当前effect不在依赖集合中，添加它
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

/**
 * 依赖触发函数
 */
function trigger(target, key, newValue, oldValue) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  if (!dep) return
  
  // 创建新的Set来避免在迭代过程中修改原Set
  const effects = new Set()
  
  dep.forEach(effect => {
    // 避免自己触发自己（无限递归）
    if (effect !== activeEffect) {
      effects.add(effect)
    }
  })
  
  // 执行所有相关的副作用函数
  effects.forEach(effect => {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  })
}

// ==================== reactive实现 ====================

/**
 * 判断是否为对象
 */
function isObject(val) {
  return val !== null && typeof val === 'object'
}

/**
 * reactive函数 - 创建响应式对象
 */
function reactive(target) {
  if (!isObject(target)) {
    console.warn('reactive() 只能用于对象')
    return target
  }
  
  // 如果已经是代理对象，直接返回
  if (target.__v_isReactive) {
    return target
  }
  
  return new Proxy(target, {
    get(target, key, receiver) {
      // 特殊属性标识
      if (key === '__v_isReactive') {
        return true
      }
      
      console.log(`  🔍 读取 ${String(key)}`)
      
      // 依赖收集
      track(target, key)
      
      const result = Reflect.get(target, key, receiver)
      
      // 如果属性值是对象，递归创建响应式
      if (isObject(result)) {
        return reactive(result)
      }
      
      return result
    },
    
    set(target, key, value, receiver) {
      const oldValue = target[key]
      
      console.log(`  ✏️  设置 ${String(key)} = ${value}`)
      
      const result = Reflect.set(target, key, value, receiver)
      
      // 只有值真正改变时才触发更新
      if (oldValue !== value) {
        trigger(target, key, value, oldValue)
      }
      
      return result
    }
  })
}

// ==================== ref实现 ====================

/**
 * ref函数 - 创建基本类型的响应式引用
 */
function ref(value) {
  return new RefImpl(value)
}

class RefImpl {
  constructor(value) {
    this.__v_isRef = true
    this._value = value
  }
  
  get value() {
    console.log(`  🔍 读取 ref.value`)
    track(this, 'value')
    return this._value
  }
  
  set value(newValue) {
    if (newValue !== this._value) {
      console.log(`  ✏️  设置 ref.value = ${newValue}`)
      this._value = newValue
      trigger(this, 'value', newValue)
    }
  }
}

/**
 * 判断是否为ref对象
 */
function isRef(val) {
  return val && val.__v_isRef === true
}

/**
 * 解包ref值
 */
function unref(val) {
  return isRef(val) ? val.value : val
}

// ==================== computed实现 ====================

/**
 * computed函数 - 创建计算属性
 */
function computed(getterOrOptions) {
  let getter, setter
  
  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions
    setter = () => {
      console.warn('computed 是只读的')
    }
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  
  return new ComputedRefImpl(getter, setter)
}

class ComputedRefImpl {
  constructor(getter, setter) {
    this._getter = getter
    this._setter = setter
    this._dirty = true  // 脏数据标记
    this._value = undefined
    this.__v_isRef = true
    
    // 创建副作用函数，但不立即执行
    this.effect = new ReactiveEffect(getter, () => {
      // 依赖变化时，标记为脏数据
      if (!this._dirty) {
        this._dirty = true
        // 触发computed本身的更新
        trigger(this, 'value')
      }
    })
  }
  
  get value() {
    console.log(`  🔍 读取 computed.value (dirty: ${this._dirty})`)
    
    // 收集computed的依赖
    track(this, 'value')
    
    // 只有在脏数据时才重新计算
    if (this._dirty) {
      console.log(`  🧮 重新计算 computed`)
      this._value = this.effect.run()
      this._dirty = false
    } else {
      console.log(`  💾 使用 computed 缓存`)
    }
    
    return this._value
  }
  
  set value(newValue) {
    this._setter(newValue)
  }
}

// ==================== effect实现 ====================

/**
 * effect函数 - 创建副作用函数
 */
function effect(fn, options = {}) {
  const effectFn = new ReactiveEffect(fn, options.scheduler)
  
  // 立即执行一次（除非是lazy）
  if (!options.lazy) {
    effectFn.run()
  }
  
  // 返回runner函数
  const runner = effectFn.run.bind(effectFn)
  runner.effect = effectFn
  
  return runner
}

// ==================== 使用示例和测试 ====================

function runTests() {
  console.log('='.repeat(50))
  console.log('🧪 开始测试 Mini Vue 3 响应式系统')
  console.log('='.repeat(50))
  
  // 测试1: reactive基本功能
  console.log('\n📌 测试1: reactive基本功能')
  console.log('-'.repeat(30))
  
  const state = reactive({
    count: 0,
    message: 'hello'
  })
  
  effect(() => {
    console.log(`  💡 effect1: count = ${state.count}`)
  })
  
  effect(() => {
    console.log(`  💡 effect2: message = ${state.message}`)
  })
  
  console.log('\n修改count:')
  state.count = 10
  
  console.log('\n修改message:')
  state.message = 'hello vue'
  
  // 测试2: ref基本功能
  console.log('\n\n📌 测试2: ref基本功能')
  console.log('-'.repeat(30))
  
  const count = ref(0)
  const message = ref('hello')
  
  effect(() => {
    console.log(`  💡 ref effect: count = ${count.value}`)
  })
  
  console.log('\n修改ref值:')
  count.value = 100
  message.value = 'hello ref'
  
  // 测试3: computed功能
  console.log('\n\n📌 测试3: computed功能')
  console.log('-'.repeat(30))
  
  const num1 = ref(10)
  const num2 = ref(20)
  
  const sum = computed(() => {
    console.log(`    🧮 计算 sum: ${num1.value} + ${num2.value}`)
    return num1.value + num2.value
  })
  
  console.log('\n第一次访问computed:')
  console.log(`sum = ${sum.value}`)
  
  console.log('\n第二次访问computed (使用缓存):')
  console.log(`sum = ${sum.value}`)
  
  effect(() => {
    console.log(`  💡 computed effect: sum = ${sum.value}`)
  })
  
  console.log('\n修改num1触发computed重新计算:')
  num1.value = 15
  
  console.log('\n修改num2触发computed重新计算:')
  num2.value = 25
  
  // 测试4: 嵌套对象响应式
  console.log('\n\n📌 测试4: 嵌套对象响应式')
  console.log('-'.repeat(30))
  
  const nested = reactive({
    user: {
      name: 'link',
      age: 25
    },
    settings: {
      theme: 'dark'
    }
  })
  
  effect(() => {
    console.log(`  💡 nested effect: user.name = ${nested.user.name}`)
  })
  
  console.log('\n修改嵌套对象属性:')
  nested.user.name = 'vue'
  nested.user.age = 30
  
  // 测试5: 避免无限递归
  console.log('\n\n📌 测试5: 避免无限递归')
  console.log('-'.repeat(30))
  
  const data = reactive({ foo: 1 })
  
  effect(() => {
    console.log(`  💡 self-increment: foo = ${data.foo}`)
    // 这个操作会同时触发读取和设置，但不会造成无限递归
    data.foo = data.foo + 1
  })
  
  console.log('\n='.repeat(50))
  console.log('✅ 所有测试完成!')
  console.log('='.repeat(50))
}

// 运行测试
runTests()

// 导出API（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    reactive,
    ref,
    computed,
    effect,
    isRef,
    unref
  }
}