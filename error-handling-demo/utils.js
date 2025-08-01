let handleError = null

export default {
  foo(fn) {
    callWithErrorHandling(fn)
  },
  bar(fn) {
    callWithErrorHandling(fn)
  },
  // 用户可以调用该函数注册统一的错误处理函数
  registerErrorHandler(fn) {
    handleError = fn
  }
}

function callWithErrorHandling(fn) {
  try {
    fn && fn()
  } catch (e) {
    if (handleError) {
      handleError(e)
      return
    } 
    console.error('未注册错误处理器，错误:', e)
  }
}