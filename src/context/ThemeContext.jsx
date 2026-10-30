import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'physics_lab_theme';

export function ThemeProvider({ children }) {
  // First-time visitors default strictly to 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (e) {
      console.warn('Unable to access localStorage for theme preference:', e);
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Unable to persist theme to localStorage:', e);
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
