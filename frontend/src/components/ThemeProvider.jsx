"use client";
import { useEffect, useState } from 'react';

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = localStorage.getItem("darkMode") === "true";
      setIsDark(darkMode);
      
      // Apply theme to body
      document.body.style.backgroundColor = darkMode ? '#111827' : '#ffffff';
      document.body.style.color = darkMode ? '#ffffff' : '#000000';
      document.body.style.transition = 'background-color 0.2s ease, color 0.2s ease';
    };

    // Check on mount
    checkDarkMode();

    // Listen for changes
    const interval = setInterval(checkDarkMode, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <body>
      {children}
    </body>
  );
};

export default ThemeProvider;