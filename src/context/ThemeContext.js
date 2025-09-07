import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Function to get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }

      // If no theme in localStorage, check system preference
      const userPrefersDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (userPrefersDark) {
        return 'dark';
      }
    }

    // Default to light
    return 'light';
  };

  // State to track current theme
  const [theme, setTheme] = useState(getInitialTheme);

  // Function to apply theme to HTML element
  const applyTheme = (newTheme) => {
    const root = window.document.documentElement;

    // Remove the old theme class and add the new one
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };

  // Apply theme on change
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Function to toggle between light/dark
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log(`Toggling theme from ${prevTheme} to ${newTheme}`); // Debug log
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
