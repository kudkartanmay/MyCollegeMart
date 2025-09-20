import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // This forwards any request starting with /api to our backend
            '/api': 'http://localhost:8080',
        },
    },
    // The old, incorrect CSS section has been removed.
    // Vite will now correctly use your postcss.config.js file by default.
})