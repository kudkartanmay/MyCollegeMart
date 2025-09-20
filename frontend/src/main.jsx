import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'; // 1. Import the provider

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* 2. Wrap the entire App with the AuthProvider */}
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
)