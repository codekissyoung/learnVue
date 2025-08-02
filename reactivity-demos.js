// ==================== Demo 3: 建立精确的依赖关系 ====================
// WeakMap结构: target -> Map
// Map结构: key -> Set<副作用函数>
const bucket3 = new WeakMap()
let activeEffect3

function track(target, key) {
  console.log(`  📊 track: 收集 ${key} 的依赖`)
  if (!activeEffect3) return
  let depsMap = bucket3.get(target)
  if (!depsMap) {
    bucket3.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect3)
  console.log(`  ✅ 依赖收集完成`)
}

function trigger(target, key) {
  console.log(`  🎯 trigger: 触发 ${key} 的依赖`)
  const depsMap = bucket3.get(target)
  if (!depsMap) return
  
  const effects = depsMap.get(key)
  if (effects) {
    console.log(`  🚀 执行 ${effects.size} 个副作用函数`)
    effects.forEach(fn => fn())
  }
}

function effect3(fn) {
  activeEffect3 = fn
  fn()
}

const data3 = { text: 'hello', count: 0 }
const obj3 = new Proxy(data3, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    trigger(target, key)
    return true
  }
})

console.log('注册依赖text的副作用函数:')
effect3(() => {
  console.log(`  💡 text变化: ${obj3.text}`)
})

console.log('\n注册依赖count的副作用函数:')
effect3(() => {
  console.log(`  💡 count变化: ${obj3.count}`)
})

console.log('\n只修改text (应该只触发text的依赖):')
obj3.text = 'hello vue'

console.log('\n只修改count (应该只触发count的依赖):')
obj3.count = 100

// ==================== Demo 4: 简化版的ref和reactive ====================
console.log('\n\n📌 Demo 4: 简化版的ref和reactive')
console.log('-'.repeat(40))

// 复用上面的track和trigger函数
let activeEffect4

function effect4(fn) {
  activeEffect4 = fn
  fn()
}

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      // 依赖收集
      if (activeEffect4) {
        let depsMap = bucket3.get(target)
        if (!depsMap) {
          bucket3.set(target, (depsMap = new Map()))
        }
        let deps = depsMap.get(key)
        if (!deps) {
          depsMap.set(key, (deps = new Set()))
        }
        deps.add(activeEffect4)
      }
      return target[key]
    },
    set(target, key, newVal) {
      target[key] = newVal
      // 依赖触发
      const depsMap = bucket3.get(target)
      if (depsMap) {
        const effects = depsMap.get(key)
        effects && effects.forEach(fn => fn())
      }
      return true
    }
  })
}

function ref(val) {
  const wrapper = {
    value: val
  }
  
  // 添加标识
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true
  })
  
  return reactive(wrapper)
}

console.log('创建reactive对象:')
const state = reactive({
  count: 0,
  message: 'hello'
})

console.log('\n注册reactive依赖:')
effect4(() => {
  console.log(`  💡 reactive count: ${state.count}`)
})

effect4(() => {
  console.log(`  💡 reactive message: ${state.message}`)
})

console.log('\n创建ref对象:')
const refCount = ref(0)

console.log('\n注册ref依赖:')
effect4(() => {
  console.log(`  💡 ref count: ${refCount.value}`)
})

console.log('\n修改reactive数据:')
state.count = 10

console.log('\n修改ref数据:')
refCount.value = 5

console.log('\n再次修改reactive数据:')
state.message = 'hello vue'

// ==================== Demo 5: computed计算属性 ====================
console.log('\n\n📌 Demo 5: computed计算属性')
console.log('-'.repeat(40))

function computed(getter) {
  let value
  let dirty = true // 缓存标志
  let activeEffect5
  
  const effectFn = () => {
    activeEffect5 = effectFn
    const result = getter()
    activeEffect5 = undefined
    return result
  }
  
  const obj = {
    get value() {
      console.log(`  🔍 访问computed.value, dirty: ${dirty}`)
      if (dirty) {
        console.log(`  🔄 重新计算computed值`)
        value = effectFn()
        dirty = false
      } else {
        console.log(`  💾 使用缓存值`)
      }
      return value
    }
  }
  
  return obj
}

const count1 = ref(10)
const count2 = ref(20)

console.log('创建computed:')
const sum = computed(() => {
  console.log(`  🧮 计算sum: ${count1.value} + ${count2.value}`)
  return count1.value + count2.value
})

console.log('\n第一次访问computed:')
console.log(`sum.value = ${sum.value}`)

console.log('\n第二次访问computed (应该使用缓存):')
console.log(`sum.value = ${sum.value}`)

console.log('\n修改依赖数据:')
count1.value = 15

console.log('\n再次访问computed (应该重新计算):')
console.log(`sum.value = ${sum.value}`)

// ==================== 总结 ====================
console.log('\n\n🎯 响应式系统核心原理总结:')
console.log('1. 依赖收集: 在数据被读取时，记录哪些函数依赖了这个数据')
console.log('2. 依赖触发: 在数据被修改时，重新执行所有依赖这个数据的函数')
console.log('3. Proxy代理: 拦截对象的get和set操作')
console.log('4. WeakMap存储: target -> Map -> key -> Set<effects>')
console.log('5. ref包装: 将基本类型包装为对象，然后使用reactive')
console.log('6. computed缓存: 只在依赖变化时重新计算')

console.log('\n' + '='.repeat(60))
console.log('Demo演示完成! 🎉')
console.log('='.repeat(60))