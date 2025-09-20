/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#0A2540',
                'secondary': '#F6F8FA',
                'accent': '#FF6B00',
            },
        },
    },
    plugins: [],
}