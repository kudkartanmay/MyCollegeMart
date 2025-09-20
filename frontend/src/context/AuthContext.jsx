import React, { createContext, useState } from 'react';

// Export the context so the hook can use it
export const AuthContext = createContext(null);

// This is the provider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('authToken', newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
        window.location.href = '/auth';
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};