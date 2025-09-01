"use client";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const MAX_SIZE = 10 * 1024 * 1024;

  const [isDragging, setIsDragging] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Listen for dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = localStorage.getItem("darkMode") === "true";
      setIsDark(darkMode);
    };
    checkDarkMode();
    const interval = setInterval(checkDarkMode, 100);
    return () => clearInterval(interval);
  }, []);

  // Handle uploaded file (overwrite)
  const handleFiles = (files) => {
    const file = files[0]; // take only one
    if (!file) return;
    if (file.size > MAX_SIZE) {
      alert("File too large! Maximum limit is 10MB")
      return;
    }
    setUploadedFile({
      name: file.name,
      type: file.type,
      size: file.size,
    });
  };

  // Remove file (reset dropzone)
  const removeFile = () => {
    setUploadedFile(null);
  };

  // Theme styles
  const containerStyle = {
    backgroundColor: isDark ? "#111827" : "#ffffff",
    color: isDark ? "#ffffff" : "#000000",
  };

  const dropZoneStyle = {
    backgroundColor: isDragging
      ? isDark
        ? "#1e3a8a"
        : "#dbeafe"
      : isDark
      ? "#374151"
      : "#f9fafb",
    borderColor: isDragging
      ? isDark
        ? "#3b82f6"
        : "#60a5fa"
      : isDark
      ? "#ffffff"
      : "#9ca3af",
    color: isDark ? "#d1d5db" : "#374151",
  };

  // File icon logic
  const getFileIcon = (fileName) => {
    if (!fileName) return "📁";
    if (fileName.endsWith(".pdf")) return "📄";
    if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) return "📝";
    if (fileName.endsWith(".txt")) return "📃";
    return "📁";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]" style={containerStyle}>
      {/* Upload Section */}
      <div className="flex-1 p-6 flex flex-col items-center">
        <div
          className="w-72 md:w-96 h-64 border-2 border-dashed rounded-lg flex items-center justify-center flex-col gap-4 transition relative"
          style={dropZoneStyle}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
        >
          {!uploadedFile ? (
            <>
              <p className="text-center">Drag & drop your file here</p>
              <input
                id="fileInput"
                type="file"
                accept=".txt,.json,.doc,.docx,.pdf"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <button
                onClick={() => document.getElementById("fileInput").click()}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
              >
                Select File
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center relative w-full h-full">
              {/* Large Icon */}
              <span className="text-8xl">{getFileIcon(uploadedFile.name)}</span>
              {/* File Name below */}
              <span className="text-sm mt-3 text-center px-2 break-words">
                {uploadedFile.name}
              </span>
              {/* Remove Button */}
              <button
                onClick={removeFile}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-2xl"
              >
                ❌
              </button>
            </div>
          )}
        </div>

        {/* Start Asking Button (10px below box) */}
        {uploadedFile && (
          <button className="mt-[10px] px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition">
            Start Asking
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
