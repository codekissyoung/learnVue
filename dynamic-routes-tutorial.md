# Vue Router 动态路由教程

## 🔧 动态路由配置

### 1. 路由配置中使用冒号 `:`
```javascript
{
  path: '/user/:id',        // :id 是动态参数
  name: 'UserDetail',
  component: UserDetail
}
```

### 2. 组件中获取参数
```vue
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const userId = route.params.id
</script>
<template>
  <div>
    <p>当前用户ID: {{ $route.params.id }}</p>
  </div>
</template>
```

## 🌟 实际应用场景

### 1. 电商网站
```javascript
// 商品详情页
{ path: '/product/:productId', component: ProductDetail }

// 访问: /product/iphone15
// 获取: route.params.productId = 'iphone15'
```

### 2. 博客系统
```javascript
// 文章详情页
{ path: '/article/:articleId', component: ArticleDetail }

// 访问: /article/123
// 获取: route.params.articleId = '123'
```

### 3. 用户中心
```javascript
// 用户资料页
{ path: '/profile/:username', component: UserProfile }

// 访问: /profile/zhangsan
// 获取: route.params.username = 'zhangsan'
```

## 🔄 多个动态参数

```javascript
{
  path: '/user/:userId/post/:postId',
  component: UserPost
}
```

访问 `/user/123/post/456` 时：
```javascript
route.params.userId = '123'
route.params.postId = '456'
```

## 📊 参数类型和验证

### 1. 数字类型参数
```javascript
{
  path: '/user/:id(\\d+)',  // 只匹配数字
  component: UserDetail
}
```

### 2. 可选参数
```javascript
{
  path: '/user/:id?',       // id参数可选
  component: UserDetail
}
```

### 3. 重复参数
```javascript
{
  path: '/tag/:tags+',      // 匹配一个或多个
  component: TagList
}
```

## 🎨 实际代码示例

### UserDetail.vue 组件
```vue
<template>
  <div>
    <h1>用户详情</h1>
    <p>用户ID: {{ userId }}</p>
    <p>姓名: {{ userData.name }}</p>
    <p>年龄: {{ userData.age }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 获取路由参数
const userId = computed(() => route.params.id)

// 模拟数据库查询
const userDatabase = {
  1: { name: '张三', age: 25 },
  2: { name: '李四', age: 30 },
  3: { name: '王五', age: 28 }
}

// 根据ID获取用户数据
const userData = computed(() => {
  return userDatabase[userId.value] || { name: '未知', age: '未知' }
})
</script>
```

## 🔄 响应路由变化

同一个组件，不同参数时会复用组件：

```vue
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 监听参数变化
watch(() => route.params.id, (newId, oldId) => {
  console.log(`用户ID从 ${oldId} 变为 ${newId}`)
  // 重新加载数据
  loadUserData(newId)
})
</script>
```

## 🧭 导航到动态路由

### 1. router-link
```vue
<template>
  <!-- 字符串路径 -->
  <router-link to="/user/123">用户123</router-link>
  
  <!-- 对象形式 -->
  <router-link :to="{ name: 'UserDetail', params: { id: 123 }}">
    用户123
  </router-link>
</template>
```

### 2. 编程式导航
```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToUser(userId) {
  // 字符串路径
  router.push(`/user/${userId}`)
  
  // 或者对象形式
  router.push({ 
    name: 'UserDetail', 
    params: { id: userId } 
  })
}
</script>
```

## 💡 最佳实践

### 1. 参数类型转换
```javascript
// 路由参数总是字符串，需要转换
const userId = computed(() => parseInt(route.params.id))
```

### 2. 404处理
```javascript
const userData = computed(() => {
  const user = userDatabase[route.params.id]
  if (!user) {
    // 跳转到404页面或显示错误信息
    router.push('/404')
  }
  return user
})
```

### 3. 数据加载
```javascript
// 组件加载时获取数据
onMounted(() => {
  loadUserData(route.params.id)
})

// 参数变化时重新加载
watch(() => route.params.id, loadUserData)
```

## 🚀 下一步扩展

1. **添加更多参数**: `/user/:id/posts/:postId`
2. **查询参数**: `/user/1?tab=profile&sort=date`
3. **路由守卫**: 验证用户ID是否有效
4. **数据预加载**: 路由进入前先加载数据

---

**记住**：动态路由的核心是"用一个组件处理多个相似的URL路径"！

*动态路由教程完成 - 2024-07-27*