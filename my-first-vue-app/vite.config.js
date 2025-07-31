import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vite配置文件 - 这就是构建工具的配置
export default defineConfig({
  plugins: [vue()], // 告诉Vite如何处理.vue文件
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})