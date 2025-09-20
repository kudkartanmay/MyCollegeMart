import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import ProductListPage from './pages/ProductListPage'; // 1. Import this page

function App() {
    const [googleClientId, setGoogleClientId] = useState(null);

    useEffect(() => {
        const fetchGoogleClientId = async () => {
            try {
                const response = await axios.get('/api/config/google-client-id');
                setGoogleClientId(response.data.clientId);
            } catch (error) {
                console.error("Could not fetch Google Client ID:", error);
            }
        };
        fetchGoogleClientId();
    }, []);

    if (!googleClientId) {
        return <div>Loading...</div>;
    }

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <Router>
                <div className="min-h-screen">
                    <Navbar />
                    <main>
                        <Routes>
                            {/* 2. Change this line to show the product list on the homepage */}
                            <Route path="/" element={<ProductListPage />} />
                            <Route path="/auth" element={<AuthPage />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;