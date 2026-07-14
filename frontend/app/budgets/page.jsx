"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ name: "", amount: "", category: "" });

  useEffect(() => {
    fetch("http://localhost:5050/budgets")
      .then(res => res.json())
      .then(setBudgets);
  }, []);

  function createBudget(e) {
    e.preventDefault();

    fetch("http://localhost:5050/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(newBudget => setBudgets([...budgets, newBudget]));
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <TopBar />

        <h1 className="text-3xl font-bold mb-8">Budgets</h1>

        <form onSubmit={createBudget} className="space-y-3 mb-6 max-w-lg">
          <input
            className="bg-slate-800 p-3 rounded w-full"
            placeholder="Budget Name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="bg-slate-800 p-3 rounded w-full"
            placeholder="Amount"
            type="number"
            onChange={e => setForm({ ...form, amount: e.target.value })}
          />
          <input
            className="bg-slate-800 p-3 rounded w-full"
            placeholder="Category"
            onChange={e => setForm({ ...form, category: e.target.value })}
          />
          <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded">
            Create Budget
          </button>
        </form>

        <div className="space-y-4">
          {budgets.map(b => (
            <div key={b.id} className="bg-slate-800 p-4 rounded border border-slate-700">
              <h2 className="text-xl font-semibold">{b.name}</h2>
              <p className="text-slate-400">Category: {b.category}</p>
              <p className="text-slate-400">Amount: ${b.amount}</p>

              <div className="mt-2 bg-slate-700 h-3 rounded">
                <div
                  className="bg-indigo-500 h-3 rounded"
                  style={{ width: `${(b.spent / b.amount) * 100}%` }}
                />
              </div>

              <p className="text-sm mt-1 text-slate-300">
                Spent: ${b.spent} / ${b.amount}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
