import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.marketplace': 'Marketplace',
    'nav.skills': 'Skills',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'login': 'Login',
    'signup': 'Sign Up',
    'search_placeholder': 'Search for books, notes, gadgets...',
  },
  hi: {
    'nav.home': 'होम',
    'nav.marketplace': 'बाज़ार',
    'nav.skills': 'कौशल',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क करें',
    'login': 'लॉग इन करें',
    'signup': 'साइन अप करें',
    'search_placeholder': 'किताबें, नोट्स, गैजेट्स खोजें...',
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const t = (key) => translations[language][key] || key;
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
