// npm包管理演示

// 1. 使用安装的包
const colors = require('colors');

console.log('=== npm包管理演示 ==='.rainbow);

// 2. 什么是包(package)？
console.log('包就是别人写好的JavaScript代码库'.green);
console.log('我们可以直接使用，不用重新造轮子'.yellow);

// 3. package.json的作用
console.log('\npackage.json文件记录了:'.blue);
console.log('- 项目信息（名称、版本、描述）'.cyan);
console.log('- 依赖包列表（dependencies）'.cyan);
console.log('- 脚本命令（scripts）'.cyan);

// 4. node_modules目录
console.log('\nnode_modules目录:'.magenta);
console.log('- 存放所有下载的包'.gray);
console.log('- 不需要提交到Git（在.gitignore中）'.gray);
console.log('- 通过npm install可以重新下载'.gray);

// 5. 类比Go语言
console.log('\n类比Go语言:'.red);
console.log('package.json ≈ go.mod'.white);
console.log('npm install ≈ go mod tidy'.white);
console.log('node_modules ≈ Go的模块缓存'.white);