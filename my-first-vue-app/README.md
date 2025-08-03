# 我的第一个Vue 3应用

这是一个Vue 3学习项目，展示了现代前端工程化开发的核心概念和最佳实践。

## 🎯 项目目标

从传统前端开发(HTML+CSS+JS+jQuery)转向现代前端工程化开发，掌握Vue 3核心概念。

## 🚀 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 现代构建工具，提供快速热更新
- **JavaScript ES6+** - 现代JavaScript语法
- **CSS3** - 样式设计

## 📁 项目结构

```
my-first-vue-app/
├── index.html          # 入口HTML文件
├── package.json        # 项目配置和依赖管理
├── vite.config.js      # Vite构建工具配置
├── src/                # 源代码目录
│   ├── main.js         # 应用入口文件
│   ├── App.vue         # 根组件
│   └── Counter.vue     # 计数器组件(自定义组件示例)
└── node_modules/       # 依赖包目录
```

## ✨ 功能特性

### 1. Vue 3响应式数据
- 使用`ref()`创建响应式变量
- 数据变化自动更新DOM
- 告别手动DOM操作

### 2. 组件化开发
- **Counter.vue** - 独立的计数器组件
- 组件复用和作用域隔离
- Props传递和计算属性

### 3. 现代开发体验
- ES6模块化 - `import/export`语法
- 单文件组件 - HTML/JS/CSS在同一文件

## 🛠️ 开发命令

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```
访问：http://localhost:5173/

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 📚 学习要点

### 2. 组件使用方式
```vue
<!-- 导入组件 -->
<script setup>
import Counter from './Counter.vue'
</script>

<!-- 使用组件 -->
<template>
  <Counter title="计数器" :initial-value="5" />
</template>
```

### 3. Vue指令示例
- `{{ }}` - 数据绑定
- `@click` - 事件绑定
- `v-if` - 条件渲染
- `:prop` - 属性绑定

## 🎓 核心概念

### Composition API
使用`<script setup>`语法糖，更直观的逻辑组织：
```javascript
import { ref, computed } from 'vue'
const count = ref(0)
const doubleCount = computed(() => count.value * 2)
```

### 组件Props
父组件向子组件传递数据：
```javascript
const props = defineProps({
  title: String,
  initialValue: Number
})
```

### 计算属性
根据响应式数据自动计算的属性：
```javascript
const status = computed(() => {
  if (count.value > 10) return '很大了！'
  return '正常'
})
```

## 🔗 相关资源

- [Vue 3官方文档](https://cn.vuejs.org/)
- [Vite官方文档](https://cn.vitejs.dev/)
- [Vue 3 Composition API](https://cn.vuejs.org/guide/composition-api-introduction.html)

---

*这是link的Vue 3学习项目，记录了从传统前端开发到现代工程化开发的学习历程。*