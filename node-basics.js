// Node.js 基础学习示例

// 1. Node.js 是什么？
// - JavaScript 运行时环境（不是浏览器中的JS）
// - 可以在服务器端运行JavaScript代码
// - 提供了文件系统、网络等系统级API

console.log('Hello Node.js!');
console.log('当前Node.js版本:', process.version);
console.log('当前平台:', process.platform);

// 2. 模块系统 - Node.js的核心特性
// CommonJS模块系统（传统方式）
const fs = require('fs'); // 文件系统模块
const path = require('path'); // 路径处理模块

console.log('当前文件路径:', __filename);
console.log('当前目录:', __dirname);

// 3. 异步编程 - Node.js的重要特性
// 读取文件（异步方式）
fs.readFile('README.md', 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件出错:', err.message);
  } else {
    console.log('README.md内容:', data);
  }
});

// 4. 全局对象
console.log('全局对象process存在:', typeof process !== 'undefined');
console.log('浏览器的window对象:', typeof window); // undefined，因为不在浏览器中

// 5. 包管理 - 为什么需要npm
// npm是Node.js的包管理器，类似于：
// - Go的go mod
// - PHP的composer  
// - Python的pip
console.log('npm可以安装和管理JavaScript库/工具');