import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from 'postcss' // <-- Make sure this import is added if not present

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': 'http://localhost:8080',
        },
    },
    // Add this new CSS configuration section
    css: {
        postcss: {
            plugins: [
                (await import('tailwindcss')).default,
                (await import('autoprefixer')).default,
            ],
        },
    },
})