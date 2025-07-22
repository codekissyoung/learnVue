// JavaScript ES6+ 语法练习文件
// 用于复习现代 JavaScript 语法，为 Vue 3 学习做准备

console.log('=== JavaScript ES6+ 语法练习 ===')

// 1. let 和 const (替代 var)
console.log('\n1. let 和 const')
const name = 'link'  // 不可重新赋值
let age = 30         // 可重新赋值
// name = 'other'    // 报错！const 不能重新赋值
age = 31             // 正常
console.log(`姓名: ${name}, 年龄: ${age}`)

// 2. 模板字符串 (Template Literals)
console.log('\n2. 模板字符串')
const skills = ['Go', 'PHP', 'JavaScript', 'MySQL']
const intro = `你好，我是 ${name}，我的技能包括：${skills.join(', ')}`
console.log(intro)

// 3. 箭头函数 (Arrow Functions)
console.log('\n3. 箭头函数')
// 传统函数写法
function traditionalFunction(x) {
    return x * 2
}
// 箭头函数写法
const arrowFunction = (x) => x * 2
const multiLineArrow = (x, y) => {
    const result = x + y
    return result
}
console.log('传统函数:', traditionalFunction(5))
console.log('箭头函数:', arrowFunction(5))
console.log('多行箭头函数:', multiLineArrow(3, 7))

// 4. 解构赋值 (Destructuring)
console.log('\n4. 解构赋值')
const user = {
    username: 'link',
    email: 'link@example.com',
    skills: ['Go', 'PHP', 'Docker']
}
// 对象解构
const { username, email } = user
console.log('用户名:', username)
console.log('邮箱:', email)

// 数组解构
const [firstSkill, secondSkill, ...otherSkills] = user.skills
console.log('第一个技能:', firstSkill)
console.log('第二个技能:', secondSkill)
console.log('其他技能:', otherSkills)

// 5. 展开运算符 (Spread Operator)
console.log('\n5. 展开运算符')
const frontendSkills = ['HTML', 'CSS', 'JavaScript']
const backendSkills = ['Go', 'PHP', 'MySQL']
const allSkills = [...frontendSkills, ...backendSkills]
console.log('所有技能:', allSkills)

// 6. 数组方法 (map, filter, find)
console.log('\n6. 数组方法')
const numbers = [1, 2, 3, 4, 5]

// map: 转换数组
const doubled = numbers.map(num => num * 2)
console.log('翻倍后:', doubled)

// filter: 过滤数组
const evenNumbers = numbers.filter(num => num % 2 === 0)
console.log('偶数:', evenNumbers)

// find: 查找元素
const found = numbers.find(num => num > 3)
console.log('第一个大于3的数:', found)

// 7. 对象简写
console.log('\n7. 对象简写')
const createUser = (name, age) => {
    // 当属性名和变量名相同时可以简写
    return {
        name,    // 相当于 name: name
        age,     // 相当于 age: age
        // 方法简写
        sayHello() {  // 相当于 sayHello: function() {...}
            return `Hello, I'm ${this.name}`
        }
    }
}

const newUser = createUser('Vue学习者', 25)
console.log(newUser)
console.log(newUser.sayHello())

// 8. Promise 基础 (异步处理)
console.log('\n8. Promise 基础')
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('数据获取成功！')
        }, 1000)
    })
}

// 使用 .then() 方式
fetchData()
    .then(data => {
        console.log('Promise结果:', data)
    })
    .catch(error => {
        console.error('出错了:', error)
    })

// 9. async/await (现代异步处理)
console.log('\n9. async/await')
const fetchDataAsync = async () => {
    try {
        console.log('开始获取数据...')
        const data = await fetchData()
        console.log('Async/Await结果:', data)
    } catch (error) {
        console.error('异步操作出错:', error)
    }
}

fetchDataAsync()

// 10. 模块化预览 (在 Vue 项目中会大量使用)
console.log('\n10. 模块化语法预览')
console.log(`
// 导出 (export)
export const PI = 3.14159
export function add(a, b) { return a + b }
export default class Calculator { /* ... */ }

// 导入 (import) 
import { PI, add } from './math.js'
import Calculator from './math.js'
import { createApp } from 'vue'  // Vue 3 中会常用到
`)

console.log('\n=== ES6+ 语法练习完成 ===')
console.log('🎉 准备开始 Vue 3 学习之旅！')