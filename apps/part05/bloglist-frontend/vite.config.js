import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //Config Vitest
  test: {
    // test options for `@testing-library/react` plugins
    environment: 'happy-dom'
  },
})
