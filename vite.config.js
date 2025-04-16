import { defineConfig } from 'vite'
export default defineConfig({
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      /.loca.lt$/, // 匹配 loca.lt 及其子域名
      'localhost',
      'gold-women-allow.loca.lt'
    ]
  }      
})