import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // 1. Import the useAuth hook

function Navbar() {
    // 2. Get the token and logout function from our AuthContext
    const { token, logout } = useAuth();

    return (
        <nav className="bg-primary text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
                    MyCollege<span className="text-accent">Mart</span>
                </Link>
                <div className="space-x-6">
                    {/* 3. Conditionally render links based on the token's existence */}
                    {token ? (
                        // If the user is logged in, show a Logout button
                        <button
                            onClick={logout}
                            className="text-lg bg-red-600 hover:bg-red-700 transition-colors text-white font-bold py-2 px-4 rounded-md"
                        >
                            Logout
                        </button>
                    ) : (
                        // If the user is logged out, show Login and Sign Up
                        <>
                            <Link to="/auth" className="text-lg hover:text-accent transition-colors">Login</Link>
                            <Link to="/auth" className="text-lg bg-accent hover:bg-orange-500 transition-colors text-white font-bold py-2 px-4 rounded-md">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;