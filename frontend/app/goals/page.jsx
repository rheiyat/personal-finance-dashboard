"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ name: "", target: "", current: "" });

  useEffect(() => {
    fetch("http://localhost:5050/goals")
      .then(res => res.json())
      .then(setGoals);
  }, []);

  function createGoal(e) {
    e.preventDefault();

    fetch("http://localhost:5050/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(newGoal => setGoals([...goals, newGoal]));
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <TopBar />

        <h1 className="text-3xl font-bold mb-8">Goals</h1>

        <form onSubmit={createGoal} className="space-y-3 mb-6 max-w-lg">
          <input
            className="bg-slate-800 p-3 rounded w-full"
            placeholder="Goal Name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="bg-slate-800 p-3 rounded w-full"
            placeholder="Target Amount"
            type="number"
            onChange={e => setForm({ ...form, target: e.target.value })}
          />
          <input
            className="bg-slate-800 p-3 rounded w-full"
            placeholder="Current Amount"
            type="number"
            onChange={e => setForm({ ...form, current: e.target.value })}
          />
          <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded">
            Create Goal
          </button>
        </form>

        <div className="space-y-4">
          {goals.map(g => (
            <div key={g.id} className="bg-slate-800 p-4 rounded border border-slate-700">
              <h2 className="text-xl font-semibold">{g.name}</h2>
              <p className="text-slate-400">Target: ${g.target}</p>

              <div className="mt-2 bg-slate-700 h-3 rounded">
                <div
                  className="bg-green-500 h-3 rounded"
                  style={{ width: `${(g.current / g.target) * 100}%` }}
                />
              </div>

              <p className="text-sm mt-1 text-slate-300">
                Progress: ${g.current} / ${g.target}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
