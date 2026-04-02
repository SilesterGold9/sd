import { defineConfig, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default mergeConfig(
  defineConfig({
    plugins: [
      tailwindcss(),
      react()
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('node_modules/cobe')) {
              return 'cobe';
            }
          },
        },
      },
    },
  }),
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  })
)
