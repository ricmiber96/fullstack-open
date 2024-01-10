import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    EnvironmentPlugin('all')
  ],
  //Config Vitest
  test: {
    // test options for `@testing-library/react` plugins
    environment: 'happy-dom'
  },
})
