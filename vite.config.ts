import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from  'tailwindcss'
import autoprefixer from 'autoprefixer'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/build.tsx', // 入口文件
      name: 'XFlowExtend',
      formats: ['es', 'cjs'], // 指定生成的模块格式
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss, 
        autoprefixer,
      ]
    }
  },
  plugins: [react()],
})
