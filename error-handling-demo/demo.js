import utils from './utils.js'

console.log('=== 错误处理 Demo 开始 ===\n')

// 1. 注册错误处理程序
utils.registerErrorHandler((e) => {
  console.log('🚨 捕获到错误:', e.message)
  console.log('📍 错误类型:', e.name)
  console.log('---')
})

console.log('✅ 已注册全局错误处理器\n')

// 2. 测试正常执行的函数
console.log('测试1: 正常函数执行')
utils.foo(() => {
  console.log('💚 foo函数正常执行')
})

utils.bar(() => {
  console.log('💚 bar函数正常执行')
})

console.log()

// 3. 测试会抛出错误的函数
console.log('测试2: 执行会出错的函数')

utils.foo(() => {
  console.log('开始执行foo中的危险操作...')
  throw new Error('foo函数中发生了业务逻辑错误!')
})

utils.bar(() => {
  console.log('开始执行bar中的危险操作...')
  // 故意访问undefined的属性
  const obj = undefined
  obj.someProperty  // 这会抛出TypeError
})

// 4. 测试不同类型的错误
utils.foo(() => {
  console.log('开始执行自定义错误...')
  const customError = new TypeError('这是一个自定义的类型错误')
  customError.code = 'CUSTOM_ERROR'
  throw customError
})

console.log('\n=== Demo 执行完成 ===')