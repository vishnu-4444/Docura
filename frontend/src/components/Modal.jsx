"use client";
import { useState, useEffect } from "react";

const Modal = ({ onClose }) => {
    const [view, setView] = useState("login")
    return (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 shadow-lg w-[90%] relative max-w-lg h-[500px] flex flex-col justify-center text-black">
            {/* Close button */}
            <button
            className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
            >
            ❌
            </button>

            {/* Modal content */}
            {view === "login" ? (
                <>
                <p className="text-center text-xl font-semibold mb-4">Login</p>
                <label htmlFor="email">Email/Username</label>
                <input type="text" placeholder="Email or Username" className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mb-2">
                  Login
                </button>
              
                <div className="flex justify-between">
                  <button className="text-blue-500 hover:underline cursor-pointer" onClick={() => setView("forgot")}>Forgot Password?</button>
                  <button className="text-blue-500 hover:underline cursor-pointer" onClick={() => setView("signup")}>Create Account</button>
                </div>
              </>
              
            ) : view === "signup" ? (
                <>
                <p className="text-center text-xl font-semibold mb-4">Signup</p>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email"  className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <label htmlFor="password">Password</label>
                <input type="password" className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <label htmlFor="password">Repeat Password</label>
                <input type="password" className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    Create Account
                </button>
                <button className="text-blue-500 hover:underline cursor-pointer" onClick={() => setView("login")}>Already have a account?</button>
                </>
            ) : (
                <>
                <p className="text-center text-xl font-semibold mb-4">Forgot Password</p>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email"  className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    Send Reset Link
                </button>
                <button className="text-blue-500 hover:underline cursor-pointer" onClick={() => setView("login")}>Back to login</button>
                </>
            )}
        </div>
        </div>
    );
};

export default Modal;
