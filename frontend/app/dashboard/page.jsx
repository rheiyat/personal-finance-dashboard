"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5050/analytics/monthly-summary?month=7&year=2024",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setSummary(data);
    }

    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 p-6 border-r border-slate-700">
        <h2 className="text-xl font-semibold mb-8 text-white">
          Finance Dashboard
        </h2>

        <nav className="space-y-4">
          <a href="/dashboard" className="block text-slate-300 hover:text-indigo-400 transition">
            Home
          </a>
          <a href="/transactions" className="block text-slate-300 hover:text-indigo-400 transition">
            Transactions
          </a>
          <a href="/budgets" className="block text-slate-300 hover:text-indigo-400 transition">
            Budgets & Goals
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Dashboard Overview
        </h1>

        {!summary ? (
          <p className="text-slate-400">Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            
            {/* Income */}
            <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-700">Income</h3>
              <p className="text-3xl font-bold text-emerald-600 mt-2">
                ${summary.income}
              </p>
            </div>

            {/* Expenses */}
            <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-700">Expenses</h3>
              <p className="text-3xl font-bold text-rose-600 mt-2">
                ${summary.expense}
              </p>
            </div>

            {/* Net */}
            <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-700">Net Balance</h3>
              <p
                className={`text-3xl font-bold mt-2 ${
                  summary.net >= 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                ${summary.net}
              </p>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
