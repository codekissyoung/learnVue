# Vue 事件冒泡和向上传播机制

## 事件冒泡原理

在 Vue 中，子组件通过 `emit` 发出的自定义事件会沿着组件树向上传播，就像 DOM 事件冒泡一样。

## 基本示例

### 组件层级结构
```
App.vue
├── ParentComponent.vue
│   ├── ChildComponent.vue
│   │   └── GrandChildComponent.vue
│   └── SiblingComponent.vue
└── AnotherComponent.vue
```

### 1. 最深层子组件发出事件

```vue
<!-- GrandChildComponent.vue -->
<template>
  <div class="grand-child">
    <h4>孙组件</h4>
    <button @click="sendMessage">发送消息给所有祖先</button>
  </div>
</template>

<script setup>
const emit = defineEmits(['message', 'update'])

const sendMessage = () => {
  // 发出事件，会向上传播到所有祖先组件
  emit('message', '来自孙组件的消息')
  emit('update', { source: 'grand-child', data: 'some data' })
}
</script>
```

### 2. 中间组件传递事件

```vue
<!-- ChildComponent.vue -->
<template>
  <div class="child">
    <h3>子组件</h3>
    <p>子组件数据: {{ childData }}</p>
    
    <!-- 监听孙组件的事件，并继续向上传播 -->
    <GrandChildComponent 
      @message="handleGrandChildMessage"
      @update="handleGrandChildUpdate"
    />
    
    <button @click="sendChildMessage">发送子组件消息</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GrandChildComponent from './GrandChildComponent.vue'

const childData = ref('子组件数据')
const emit = defineEmits(['message', 'update', 'child-message'])

// 处理孙组件的事件
const handleGrandChildMessage = (message) => {
  console.log('子组件收到孙组件消息:', message)
  // 可以选择继续向上传播，也可以在这里处理
  emit('message', message) // 继续向上传播
}

const handleGrandChildUpdate = (data) => {
  console.log('子组件收到孙组件更新:', data)
  // 可以修改数据后再传播
  emit('update', { ...data, processedBy: 'child' })
}

const sendChildMessage = () => {
  emit('child-message', '来自子组件的消息')
}
</script>
```

### 3. 父组件接收所有事件

```vue
<!-- ParentComponent.vue -->
<template>
  <div class="parent">
    <h2>父组件</h2>
    <p>收到的消息: {{ receivedMessages }}</p>
    
    <!-- 监听子组件和孙组件的所有事件 -->
    <ChildComponent 
      @message="handleMessage"
      @update="handleUpdate"
      @child-message="handleChildMessage"
    />
    
    <SiblingComponent />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'
import SiblingComponent from './SiblingComponent.vue'

const receivedMessages = ref([])

// 处理来自孙组件的消息
const handleMessage = (message) => {
  console.log('父组件收到消息:', message)
  receivedMessages.value.push({
    type: 'message',
    content: message,
    timestamp: new Date().toLocaleTimeString()
  })
}

// 处理来自孙组件的更新
const handleUpdate = (data) => {
  console.log('父组件收到更新:', data)
  receivedMessages.value.push({
    type: 'update',
    content: data,
    timestamp: new Date().toLocaleTimeString()
  })
}

// 处理来自子组件的消息
const handleChildMessage = (message) => {
  console.log('父组件收到子组件消息:', message)
  receivedMessages.value.push({
    type: 'child-message',
    content: message,
    timestamp: new Date().toLocaleTimeString()
  })
}
</script>
```

### 4. 根组件最终接收

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <h1>根组件</h1>
    <p>所有事件日志:</p>
    <ul>
      <li v-for="log in eventLogs" :key="log.id">
        {{ log.timestamp }} - {{ log.type }}: {{ log.content }}
      </li>
    </ul>
    
    <!-- 监听所有子组件的事件 -->
    <ParentComponent 
      @message="logEvent"
      @update="logEvent"
      @child-message="logEvent"
    />
    
    <AnotherComponent />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ParentComponent from './ParentComponent.vue'
import AnotherComponent from './AnotherComponent.vue'

const eventLogs = ref([])
let logId = 0

const logEvent = (content) => {
  eventLogs.value.push({
    id: ++logId,
    type: 'event',
    content: typeof content === 'string' ? content : JSON.stringify(content),
    timestamp: new Date().toLocaleTimeString()
  })
}
</script>
```

## 事件传播的特点

### 1. **自动向上传播**
```vue
<!-- 只要中间组件不阻止，事件会一直向上传播 -->
<GrandChild @event="handleEvent" />
<!-- 等同于 -->
<GrandChild @event="$emit('event', $event)" />
```

### 2. **选择性传播**
```vue
<script setup>
const emit = defineEmits(['event'])

const handleChildEvent = (data) => {
  // 可以选择是否继续传播
  if (data.shouldPropagate) {
    emit('event', data) // 继续传播
  }
  // 或者在这里处理完就不传播了
}
</script>
```

### 3. **数据转换传播**
```vue
<script setup>
const emit = defineEmits(['event'])

const handleChildEvent = (data) => {
  // 可以修改数据后再传播
  const transformedData = {
    ...data,
    processedBy: 'middle-component',
    timestamp: Date.now()
  }
  emit('event', transformedData)
}
</script>
```

## 实际应用场景

### 1. **全局通知系统**
```vue
<!-- 任何深层组件都可以发出全局通知 -->
<script setup>
const emit = defineEmits(['global-notification'])

const showNotification = (message) => {
  emit('global-notification', {
    type: 'success',
    message,
    duration: 3000
  })
}
</script>
```

### 2. **状态同步**
```vue
<!-- 深层组件状态变化时，通知所有祖先 -->
<script setup>
const emit = defineEmits(['state-change'])

const updateState = (newState) => {
  localState.value = newState
  emit('state-change', { component: 'deep-child', state: newState })
}
</script>
```

### 3. **用户交互追踪**
```vue
<!-- 追踪用户在任何组件的操作 -->
<script setup>
const emit = defineEmits(['user-action'])

const handleUserAction = (action) => {
  emit('user-action', {
    component: 'some-deep-component',
    action,
    timestamp: Date.now()
  })
}
</script>
```

## 注意事项

### 1. **性能考虑**
- 事件传播会触发所有中间组件的处理函数
- 避免在传播链中做复杂的计算

### 2. **事件命名**
- 使用清晰的事件名称
- 避免事件名称冲突

### 3. **数据大小**
- 避免传递过大的数据对象
- 考虑使用事件总线或状态管理

## 总结

Vue 的事件冒泡机制让子组件可以：
- ✅ 向任意层级的祖先组件发送事件
- ✅ 在传播过程中修改或过滤事件数据
- ✅ 实现跨组件的通信和状态同步
- ✅ 构建灵活的事件处理系统

这种机制是 Vue 组件通信的重要基础，特别适合处理组件树中的事件传播需求。 