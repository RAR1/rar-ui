import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ttRoot } from '@test-ui/build-utils'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001,
  },
})
