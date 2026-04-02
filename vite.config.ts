import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mergeConfig } from 'vitest/config'

// https://vite.dev/config/
export default mergeConfig(
  defineConfig({
    plugins: [
      tailwindcss(),
      react()
    ],
  }),
  {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  }
)
