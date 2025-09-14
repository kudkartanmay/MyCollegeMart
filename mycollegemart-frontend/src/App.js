import AppContent from './components/AppContent';
import NotificationContainer from './components/common/NotificationContainer';
import { GlobalStateProvider } from './context/GlobalStateContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStateProvider>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <AppContent />
            <NotificationContainer />
          </div>
        </GlobalStateProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

// The switch statement was removed because 'return' can only be used inside functions.
// If you need to render different components based on 'currentPage', 
// move this logic inside a function component and use state/hooks as needed.