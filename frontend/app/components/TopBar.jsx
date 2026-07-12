"use client";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function TopBar() {
  useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser || storedUser === "undefined") {
    return; // do nothing
  }

  try {
    setUser(JSON.parse(storedUser));
  } catch (err) {
    console.error("Invalid user JSON:", storedUser);
  }
}, []);


  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <div className="w-full flex justify-end items-center px-6 py-4 bg-slate-800 border-b border-slate-700">
      {user ? (
        <div className="flex items-center space-x-4 text-slate-200">
          <span>Logged in as <strong>{user.name}</strong></span>
          <button
            onClick={handleLogout}
            className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link href="/login" className="text-slate-300 hover:text-indigo-400">
            Login
          </Link>
          <Link href="/register" className="text-slate-300 hover:text-indigo-400">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
