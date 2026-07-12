"use client";
import { useState } from "react";

export default function AuthForm({ type, onSubmit }) {
  const [name, setName] = useState("");        // NEW
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    let result;

    if (type === "register") {
      result = await onSubmit(name, email, password);   // pass name
    } else {
      result = await onSubmit(email, password);         // login unchanged
    }

    if (result.token) {
      localStorage.setItem("token", result.token);
      window.location.href = "/dashboard";
    } else if (result.message) {
      setError(result.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">
          {type === "login" ? "Login" : "Create Account"}
        </h1>

        {error && (
          <p className="mb-4 text-rose-500 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {type === "register" && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-700 text-slate-700" value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-700 text-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-700 text-slate-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-3 rounded-lg font-medium transition"
          >
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600 text-center">
          {type === "login" ? (
            <a href="/register" className="text-indigo-500 hover:underline">
              Create an account
            </a>
          ) : (
            <a href="/login" className="text-indigo-500 hover:underline">
              Already have an account?
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
