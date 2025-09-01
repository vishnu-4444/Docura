"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "./Modal";

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    const darkMode = saved ? saved === "true" : true; // Default to dark
    setIsDark(darkMode);
    
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle function
  const toggleDark = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  // Theme styles
  const navStyle = {
    backgroundColor: isDark ? '#111827' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000',
    borderColor: isDark ? '#374151' : '#e5e7eb',
  };

  const buttonStyle = {
    backgroundColor: isDark ? '#374151' : '#e5e7eb',
    color: isDark ? '#ffffff' : '#000000',
  };

  const toggleStyle = {
    backgroundColor: isDark ? '#4b5563' : '#d1d5db',
  };

  return (
    <>
    <nav 
      className="flex items-center justify-between px-6 py-4 shadow-md border-b transition-colors"
      style={navStyle}
    >
      {/* Brand */}
      <div>
        <Link
          href="/"
          className="text-xl font-bold hover:opacity-80 transition"
          style={{ color: isDark ? '#93c5fd' : '#3b82f6' }}
        >
          Docura
        </Link>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Dark/Light Toggle */}
        <div className="relative group">
          <div
            className="w-12 h-6 rounded-full relative cursor-pointer transition-colors"
            style={toggleStyle}
            onClick={toggleDark}
          >
            <div
              className={`w-6 h-6 rounded-full absolute top-0 transition-transform shadow-sm ${
                isDark ? "translate-x-6" : "translate-x-0"
              }`}
              style={{
                backgroundColor: isDark ? '#ffffff' : '#374151'
              }}
            ></div>
          </div>
          
          {/* Hover tooltip */}
          <div 
            className="absolute top-1/2 -left-20 transform -translate-y-1/2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
            style={{ 
              backgroundColor: isDark ? '#374151' : '#f3f4f6',
              color: isDark ? '#ffffff' : '#000000'
            }}
          >
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </div>
        </div>

        {/* Login Button */}
        <button 
          className="px-4 py-2 rounded-lg hover:opacity-80 transition cursor-pointer"
          style={buttonStyle}
          onClick={() => {setIsModalOpen(true)}}
        >
          Login
        </button>
      </div>
    </nav>
    {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Navbar;