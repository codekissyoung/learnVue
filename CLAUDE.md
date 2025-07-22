# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
这是link的Vue 3学习仓库，用于从传统前端开发(HTML+CSS+JS+jQuery)转向现代前端工程化开发。

## 当前学习进度

### 已完成 ✅
- **Node.js基础**: 理论学习和实践完成
  - 理解了Node.js vs 浏览器JavaScript的区别
  - 掌握了npm包管理系统概念
  - 完成了基础实践练习
  - 创建了详细教程: `01-nodejs-tutorial.md`

- **现代JavaScript语法**: 核心概念掌握
  - ES6+语法复习完成 (`practice.js`)
  - 深入理解Promise异步编程原理 (`promise-tutorial.md`)
  - 掌握async/await现代异步语法 (`async-await-tutorial.md`)
  - 理解JavaScript模块化机制 (`js-modules-tutorial.md`)
  - 从传统脚本开发转向现代工程化开发思维

- **前端工程化理解**: 概念转换完成
  - 理解传统前端 vs 现代工程化开发区别
  - 了解脚手架和构建工具的作用
  - 确定使用Vite作为构建工具
  - 理解打包、构建、热更新等概念

- **Vue 3学习准备**: 技术栈确定
  - 确认Vue 3 + Vite技术路线
  - 决定暂不学TypeScript，专注JavaScript版本
  - 理解Promise/async-await在Vue中的重要性
  - 掌握模块化在组件开发中的应用

### 正在进行 ⏳
- **深度文档阅读**: 今晚阅读创建的技术文档
  - `promise-tutorial.md` - Promise详解和Go语言对比
  - `async-await-tutorial.md` - 现代异步语法和使用场景
  - `js-modules-tutorial.md` - 从传统脚本到现代模块化

### 下次继续 📋
- **创建第一个Vue 3项目**: 使用Vite脚手架
- **理解Vue项目结构**: 文件组织和模块关系
- **学习Vue 3核心概念**: Composition API、响应式系统
- **体验现代前端开发流程**: 热更新、构建、部署

## Technology Stack
- **框架**: Vue 3 (使用Composition API)
- **构建工具**: Vite (现代构建工具，比webpack简单)
- **包管理器**: npm (统一使用npm，不混用yarn)
- **代码风格**: 遵循Vue 3官方推荐规范

## Development Setup
当项目初始化后，常用命令将包括：
```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
```

## Learning Path Context
这个项目专门用于学习现代前端工程化开发，重点关注：
1. **从jQuery到Vue 3的思维转换**: 从DOM操作转向数据驱动
2. **现代工程化工具**: Vite构建工具的使用
3. **Vue 3核心概念**: Composition API、单文件组件、响应式系统
4. **项目组织**: 标准Vue项目结构和最佳实践

## Code Style Guidelines
- 使用Vue 3 Composition API而非Options API
- 单文件组件(.vue)采用`<script setup>`语法糖
- 优先使用现代JavaScript特性(ES6+)
- 保持代码简洁易懂，适合学习理解

## 当前项目状态
- **环境已配置**: Node.js v24.4.1, npm v11.4.2
- **项目已初始化**: 已创建package.json，安装了colors包作为演示
- **学习资料完整**: 
  - `01-nodejs-tutorial.md` - Node.js基础教程（包含Mermaid图表）
  - `node-basics.js` - Node.js基础概念演示代码
  - `npm-demo.js` - npm包管理演示代码
  - `practice.js` - ES6+语法练习文件
  - `promise-tutorial.md` - Promise异步编程详解（含Go语言对比）
  - `async-await-tutorial.md` - async/await现代语法教程（含使用场景分析）
  - `js-modules-tutorial.md` - JavaScript模块化完整教程（含实际项目示例）
  - `read-from-book.md` - 书本学习笔记（含Node.js异步I/O原理深度解析）

## VSCode配置状态
- 用户已下载Mermaid插件的VSIX文件，需要通过命令面板安装
- 安装方法: `Cmd+Shift+P` → `Extensions: Install from VSIX...`
- 安装完成后可以在Markdown预览中看到Mermaid流程图

## Development Notes
- 这是学习项目，代码应该包含清晰的注释说明概念
- 每个功能实现后应该有对应的学习总结
- 优先实用性和理解性，而非复杂性
- 渐进式学习，先掌握核心概念再深入高级特性
- 用户喜欢通过Mermaid图表理解概念，应该多使用可视化说明

## 下次继续的任务
1. 阅读完成今天创建的技术文档，消化理解现代JavaScript概念
2. 开始创建第一个Vue 3项目（使用 `npm create vue@latest` 命令）
3. 理解Vue项目结构和文件组织方式
4. 学习Vue 3基础语法和Composition API
5. 体验Vite的热更新和现代前端开发流程

## 今天的收获总结 (2024-07-22)
- **核心突破**: 从传统JavaScript开发思维转向现代模块化工程化思维
- **技术理解**: 深度掌握Promise、async/await、模块化等Vue开发必备概念
- **文档产出**: 创建了4个详细技术教程，可作为长期参考资料
- **准备就绪**: 已具备开始Vue 3学习的所有前置知识