import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false; 
  });

  const toggleTheme = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      toast.success(newMode ? "Dark Mode Enabled" : "Light Mode Enabled");
      return newMode;
    });
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
