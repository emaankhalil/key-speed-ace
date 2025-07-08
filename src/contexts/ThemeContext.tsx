
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('inter');

  useEffect(() => {
    // Load settings from localStorage
    const savedTheme = localStorage.getItem('isDarkMode');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedFontFamily = localStorage.getItem('fontFamily');

    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
    if (savedFontSize) {
      setFontSize(Number(savedFontSize));
    }
    if (savedFontFamily) {
      setFontFamily(savedFontFamily);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    // Apply font size globally
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    // Apply font family globally
    const fontClass = `font-${fontFamily}`;
    document.body.className = document.body.className.replace(/font-\w+/g, '');
    document.body.classList.add(fontClass);
    localStorage.setItem('fontFamily', fontFamily);
  }, [fontFamily]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
