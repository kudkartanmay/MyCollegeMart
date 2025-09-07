import React from 'react';
import AppContent from './components/AppContent';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { GlobalStateProvider } from './context/GlobalStateContext';

function App() {
  return (
    <GlobalStateProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </GlobalStateProvider>
  );
}

export default App;