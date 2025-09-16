import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

// GOOGLE_CLIENT_ID is not used and has been removed to avoid warnings.

const DebugGoogleAuth = () => {
  const [log, setLog] = useState([]);
  const [tokenData, setTokenData] = useState(null);
  
  const addLog = (message) => {
    setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };
  
  const handleSuccess = (response) => {
    addLog(`Success: received credential of length ${response?.credential?.length || 0}`);
    
    // If you have the credential, you can decode it to check contents
    // (JWT tokens can be decoded without verification for debugging)
    if (response?.credential) {
      try {
        // Decode JWT token parts (header, payload, signature)
        const parts = response.credential.split('.');
        const payload = JSON.parse(atob(parts[1]));
        setTokenData(payload);
        addLog(`Token decoded: ${payload.email}`);
      } catch (error) {
        addLog(`Error decoding token: ${error.message}`);
      }
    }
  };
  
  const handleError = () => {
    addLog('Error: Google sign-in failed');
  };

  useEffect(() => {
    // Check if the window.postMessage works
    try {
      const testWindow = window.open('', '_blank');
      if (testWindow) {
        testWindow.postMessage('test', window.location.origin);
        testWindow.close();
        addLog('postMessage test: Success');
      } else {
        addLog('postMessage test: Failed - popup blocked');
      }
    } catch (error) {
      addLog(`postMessage test: Error - ${error.message}`);
    }
  }, []);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Google Auth Debug</h1>
      
      <div style={{ margin: '20px 0' }}>
        <h2>Testing Google Login</h2>
        <GoogleLogin 
          onSuccess={handleSuccess}
          onError={handleError}
          width={300}
          useOneTap={false}
        />
      </div>
      
      <div>
        <h2>Log:</h2>
        <pre style={{ 
          background: '#f0f0f0', 
          padding: '10px', 
          borderRadius: '5px', 
          maxHeight: '200px', 
          overflow: 'auto'
        }}>
          {log.map((entry, i) => (
            <div key={i}>{entry}</div>
          ))}
        </pre>
      </div>
      
      {tokenData && (
        <div>
          <h2>Token Data:</h2>
          <pre style={{ 
            background: '#f0f0f0', 
            padding: '10px', 
            borderRadius: '5px', 
            maxHeight: '300px', 
            overflow: 'auto'
          }}>
            {JSON.stringify(tokenData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DebugGoogleAuth;
