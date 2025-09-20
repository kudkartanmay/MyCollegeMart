import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-primary text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
                    MyCollege<span className="text-accent">Mart</span>
                </Link>
                <div className="space-x-6">
                    {/* Both links now point to /auth */}
                    <Link to="/auth" className="text-lg hover:text-accent transition-colors">Login</Link>
                    <Link to="/auth" className="text-lg bg-accent hover:bg-orange-500 transition-colors text-white font-bold py-2 px-4 rounded-md">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;