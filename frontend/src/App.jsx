import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage'; // Import the new page

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
                            <Route path="/" element={<HomePage />} />
                            {/* Both login and register are handled here now */}
                            <Route path="/auth" element={<AuthPage />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;