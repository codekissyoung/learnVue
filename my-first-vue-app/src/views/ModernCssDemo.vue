<template>
  <div class="modern-css-demo">
    <h1>现代CSS布局演示</h1>
    
    <!-- 
      CSS Grid布局演示区域
      展示2018年后最重要的二维布局系统
    -->
    <section class="grid-demo">
      <h2>CSS Grid 布局</h2>
      <!-- 
        Holy Grail布局：经典的三栏布局
        - 头部和底部横跨全宽
        - 中间左右固定宽度，主内容区自适应
        - 在传统Float时代需要大量hack，Grid一次性完美解决
      -->
      <div class="holy-grail">
        <!-- Grid区域：header - 使用grid-area指定位置 -->
        <header class="grid-header">Header</header>
        
        <!-- Grid区域：nav - 左侧导航，固定200px宽度 -->
        <nav class="grid-nav">Nav</nav>
        
        <!-- Grid区域：main - 主内容区，自动填满剩余空间(1fr) -->
        <main class="grid-main">
          <h3>主内容区</h3>
          <p>这是使用CSS Grid实现的经典Holy Grail布局</p>
        </main>
        
        <!-- Grid区域：aside - 右侧边栏，固定200px宽度 -->
        <aside class="grid-aside">Sidebar</aside>
        
        <!-- Grid区域：footer - 底部，横跨全宽 -->
        <footer class="grid-footer">Footer</footer>
      </div>
    </section>

    <!-- 
      Flexbox布局演示区域
      展示一维布局系统的强大能力
    -->
    <section class="flex-demo">
      <h2>Flexbox 布局</h2>
      
      <!-- 
        现代导航栏演示
        使用Flexbox实现完美的水平布局和对齐
        在2018年前需要float + clearfix的复杂方案
      -->
      <div class="navbar-demo">
        <!-- 导航栏左侧：品牌Logo -->
        <div class="logo">Logo</div>
        
        <!-- 导航栏中间：导航链接组 -->
        <nav class="nav-links">
          <a href="#" class="nav-link">首页</a>
          <a href="#" class="nav-link">产品</a>
          <a href="#" class="nav-link">关于</a>
        </nav>
        
        <!-- 导航栏右侧：用户操作按钮组 -->
        <div class="user-actions">
          <button class="btn">登录</button>
          <button class="btn primary">注册</button>
        </div>
      </div>
      
      <!-- 
        响应式卡片网格演示
        flex-wrap: wrap 自动换行
        flex: 1 1 300px 响应式伸缩
        gap: 16px 现代间距语法
      -->
      <div class="card-grid">
        <div class="card" v-for="i in 6" :key="i">
          <div class="card-image">🎨</div>
          <h3>卡片 {{ i }}</h3>
          <p>使用Flexbox实现的响应式卡片布局</p>
        </div>
      </div>
    </section>

    <!-- 
      现代CSS特性演示区域
      展示2018年后出现的新CSS功能
    -->
    <section class="modern-features">
      <h2>现代CSS特性</h2>
      
      <!-- 使用Grid布局的特性展示网格 -->
      <div class="feature-grid">
        <!-- CSS变量功能说明 -->
        <div class="feature-card variable-demo">
          <h3>CSS变量演示</h3>
          <p>CSS变量需要在全局作用域中定义才能正常工作。在scoped样式中，我们使用具体数值来避免影响框架全局样式。</p>
        </div>
        
        <!-- clamp()响应式字体演示 -->
        <div class="feature-card clamp-demo">
          <h3>响应式字体</h3>
          <!-- 
            clamp(最小值, 理想值, 最大值) 
            字体大小会在1rem到2rem之间，理想情况下是3vw
            随窗口大小自动调整，无需媒体查询
          -->
          <p class="clamp-text">这段文字使用clamp()函数实现响应式字体大小</p>
        </div>
        
        <!-- aspect-ratio宽高比演示 -->
        <div class="feature-card aspect-ratio-demo">
          <h3>宽高比</h3>
          <!-- 
            aspect-ratio: 16/9 固定宽高比
            替代传统的padding-top hack方法
            无论容器宽度如何变化，始终保持16:9比例
          -->
          <div class="aspect-box">16:9 宽高比盒子</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 现代CSS布局演示页面
// 使用具体数值避免影响Vue 3项目的全局样式
</script>

<style scoped>
/* 
  现代CSS布局演示样式
  
  设计原则：
  1. 使用具体数值替代CSS变量，避免影响Vue 3全局样式
  2. 所有样式使用scoped作用域，确保样式隔离
  3. 添加具体选择器前缀，防止样式泄露
  4. 重点展示2018年后的现代CSS特性
*/

/* 确保所有元素使用现代盒模型 */
.modern-css-demo * {
  box-sizing: border-box;
}

/* 重置演示页面内的header元素，避免影响Vue 3主框架header */
.modern-css-demo header {
  position: static !important;  /* 强制静态定位 */
  z-index: auto !important;     /* 重置层级 */
}

/* 演示页面主容器 */
.modern-css-demo {
  max-width: 1200px;  /* 限制最大宽度，提升阅读体验 */
  margin: 0 auto;     /* 水平居中 */
  padding: 24px;      /* 内边距 */
}

/* ==========================================================================
   CSS Grid 布局演示区域
   ========================================================================== */

.grid-demo {
  margin-bottom: 32px;  /* 与下一个演示区域的间距 */
}

/* 
  Holy Grail布局：Web开发中的经典布局模式
  
  传统实现方式的痛点：
  - Float布局需要clearfix hack
  - 绝对定位布局难以响应式
  - Flexbox只能处理一维布局
  
  CSS Grid的优势：
  - 二维布局系统，同时控制行和列
  - 语义化的区域命名
  - 自动处理对齐和间距
*/
.holy-grail {
  display: grid;  /* 启用CSS Grid布局 */
  
  /* 
    grid-template-areas: 可视化定义网格区域
    每行代表grid的一行，每个字符串代表一列
    相同名称的区域会合并成一个大区域
  */
  grid-template-areas: 
    "header header header"  /* 第1行：header横跨3列 */
    "nav main aside"        /* 第2行：nav、main、aside各占1列 */
    "footer footer footer"; /* 第3行：footer横跨3列 */
  
  /* 
    grid-template-columns: 定义列的尺寸
    200px: 左侧nav固定200px
    1fr: 中间main自动填满剩余空间 (fraction单位)
    200px: 右侧aside固定200px
  */
  grid-template-columns: 200px 1fr 200px;
  
  /* 
    grid-template-rows: 定义行的尺寸
    auto: header高度根据内容自动调整
    1fr: main区域填满剩余垂直空间
    auto: footer高度根据内容自动调整
  */
  grid-template-rows: auto 1fr auto;
  
  gap: 16px;                /* 网格项之间的间距，替代复杂的margin计算 */
  min-height: 300px;        /* 最小高度，确保布局可见性 */
  border: 2px solid #42b883; /* 边框，便于观察布局边界 */
  border-radius: 8px;       /* 圆角 */
  overflow: hidden;         /* 隐藏溢出内容，保持圆角效果 */
}

/* Grid区域样式 - 使用具体选择器避免样式泄露 */

/* Header区域：顶部横幅 */
.holy-grail .grid-header {
  grid-area: header;        /* 指定网格区域名称 */
  background: #42b883;      /* Vue绿色主题 */
  color: white;
  display: flex;            /* 使用Flexbox实现内容居中 */
  align-items: center;      /* 垂直居中 */
  justify-content: center;  /* 水平居中 */
  padding: 16px;
}

/* Nav区域：左侧导航栏 */
.holy-grail .grid-nav {
  grid-area: nav;           /* 指定网格区域名称 */
  background: #f3f4f6;      /* 浅灰色背景 */
  padding: 16px;
}

/* Main区域：主内容区域 */
.holy-grail .grid-main {
  grid-area: main;          /* 指定网格区域名称 */
  padding: 16px;
  background: white;        /* 白色背景突出主要内容 */
}

/* Aside区域：右侧边栏 */
.holy-grail .grid-aside {
  grid-area: aside;         /* 指定网格区域名称 */
  background: #f3f4f6;      /* 与nav相同的浅灰色 */
  padding: 16px;
}

/* Footer区域：底部信息栏 */
.holy-grail .grid-footer {
  grid-area: footer;        /* 指定网格区域名称 */
  background: #369870;      /* 深绿色背景 */
  color: white;
  display: flex;            /* Flexbox居中对齐 */
  align-items: center;
  justify-content: center;
  padding: 16px;
}

/* ==========================================================================
   Flexbox 布局演示区域
   ========================================================================== */

.flex-demo {
  margin-bottom: 32px;  /* 与下个演示区域的间距 */
}

/* 
  现代导航栏布局
  
  传统实现的问题：
  - float: left/right 需要clearfix
  - 垂直居中需要line-height hack
  - 响应式布局复杂
  
  Flexbox的优势：
  - 一行代码实现垂直居中
  - 自动分配空间
  - 天然支持响应式
*/
.navbar-demo {
  display: flex;                    /* 启用Flexbox布局 */
  justify-content: space-between;   /* 主轴两端对齐：logo在左，按钮在右，导航在中间 */
  align-items: center;              /* 交叉轴居中：所有元素垂直居中对齐 */
  padding: 16px;
  background: white;
  border-radius: 8px;               /* 圆角 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* 轻微阴影增强层次感 */
  margin-bottom: 24px;
}

/* 导航栏元素样式 */

/* Logo样式 */
.logo {
  font-weight: bold;
  color: #42b883;        /* Vue主题色 */
  font-size: 18px;
}

/* 导航链接组 */
.nav-links {
  display: flex;         /* 水平排列导航链接 */
  gap: 24px;            /* 现代间距语法，替代margin */
}

/* 单个导航链接 */
.nav-link {
  text-decoration: none;
  color: #374151;       /* 深灰色文本 */
  transition: color 0.2s; /* 平滑的颜色过渡动画 */
}

.nav-link:hover {
  color: #42b883;       /* 悬停时变为主题色 */
}

/* 用户操作按钮组 */
.user-actions {
  display: flex;        /* 水平排列按钮 */
  gap: 8px;            /* 按钮间小间距 */
}

/* 按钮基础样式 */
.btn {
  padding: 8px 16px;              /* 内边距 */
  border: 1px solid #d1d5db;      /* 边框 */
  border-radius: 6px;             /* 圆角 */
  background: white;              /* 背景色 */
  cursor: pointer;                /* 手型光标 */
  transition: all 0.2s;           /* 所有属性的平滑过渡 */
}

/* 主要按钮样式 */
.btn.primary {
  background: #42b883;            /* 主题色背景 */
  color: white;                   /* 白色文字 */
  border-color: #42b883;          /* 主题色边框 */
}

/* 按钮悬停效果 */
.btn:hover {
  transform: translateY(-1px);    /* 轻微上移效果 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 添加阴影 */
}

/* 
  响应式卡片网格布局
  
  传统实现困难：
  - float布局需要计算宽度百分比
  - 需要nth-child清除浮动
  - 响应式断点复杂
  
  Flexbox的优势：
  - flex: 1 1 300px 自动响应式
  - flex-wrap: wrap 自动换行
  - gap统一间距，无需复杂margin计算
*/
.card-grid {
  display: flex;           /* 启用Flexbox */
  flex-wrap: wrap;         /* 允许子元素换行 */
  gap: 16px;              /* 卡片间统一间距 */
}

/* 
  响应式卡片
  flex: grow shrink basis
  - grow: 1 (允许增长)
  - shrink: 1 (允许收缩) 
  - basis: 300px (基础宽度)
  
  效果：每个卡片最小300px，有多余空间时等比例增长
*/
.card {
  flex: 1 1 300px;               /* 响应式伸缩 */
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;    /* 悬停动画 */
}

/* 卡片悬停效果 */
.card:hover {
  transform: translateY(-4px);   /* 向上浮动效果 */
}

/* 卡片内图标 */
.card-image {
  font-size: 3rem;              /* 大图标 */
  text-align: center;
  margin-bottom: 16px;
}

/* ==========================================================================
   现代CSS特性演示区域
   ========================================================================== */

.modern-features {
  margin-bottom: 32px;
}

/* 
  特性展示网格
  
  auto-fit vs auto-fill:
  - auto-fit: 自动拉伸填满容器
  - auto-fill: 保持列宽，留空白区域
  
  minmax(300px, 1fr):
  - 最小300px
  - 最大1fr(可用空间的等比例)
*/
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;              /* 网格间距 */
}

/* 特性卡片样式 */
.feature-card {
  background: white;
  padding: 24px;
  border-radius: 12px;    /* 大圆角，现代设计趋势 */
  box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* 深度阴影 */
}

/* 
  clamp()响应式字体
  
  语法：clamp(最小值, 理想值, 最大值)
  - 1rem: 最小字体大小，确保可读性
  - 3vw: 理想字体大小，随视口宽度缩放
  - 2rem: 最大字体大小，防止过大
  
  优势：无需媒体查询就能实现响应式字体
*/
.clamp-text {
  font-size: clamp(1rem, 3vw, 2rem);
  line-height: 1.5;
  color: #374151;
}

/* 
  aspect-ratio现代特性
  
  传统实现方式：
  .old-aspect-box {
    width: 100%;
    padding-top: 56.25%;  // 16:9 = 9/16*100%
    position: relative;
  }
  
  现代实现：
  aspect-ratio: 16 / 9;  // 一行搞定！
*/
.aspect-box {
  aspect-ratio: 16 / 9;           /* 固定16:9宽高比 */
  background: linear-gradient(45deg, #42b883, #369870); /* 渐变背景 */
  color: white;
  display: flex;                  /* 居中显示文字 */
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
}

/* ==========================================================================
   响应式设计
   ========================================================================== */

/* 移动端适配 */
@media (max-width: 768px) {
  /* Grid布局在小屏幕上改为垂直堆叠 */
  .holy-grail {
    grid-template-areas: 
      "header"    /* 每行只有一列 */
      "nav"
      "main"
      "aside"
      "footer";
    grid-template-columns: 1fr;    /* 单列，占满全宽 */
  }
  
  /* 导航栏在小屏幕上改为垂直布局 */
  .navbar-demo {
    flex-direction: column;        /* 垂直排列 */
    gap: 16px;                     /* 增加垂直间距 */
  }
  
  /* 导航链接垂直排列并居中 */
  .nav-links {
    flex-direction: column;        /* 垂直排列链接 */
    text-align: center;           /* 文字居中 */
  }
}
</style>