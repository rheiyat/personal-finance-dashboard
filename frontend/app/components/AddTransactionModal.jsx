"use client";
import { useState } from "react";

export default function AddTransactionModal({ open, onClose, onAdded }) {
  console.log("AddTransactionModal RENDERED");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("FORM SUBMITTED");

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5050/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: Number(amount),
        type,
        category,
        date,
        notes,
      }),
    });

    const data = await res.json();
    console.log("RESPONSE:", data);

    if (data._id || data.transaction?._id) {
      await onAdded();
      onClose();
    } else {
      console.log("Add transaction failed:", data);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">
          Add Transaction
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-slate-700 font-medium">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg placeholder-slate-400 text-slate-700 bg-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700 font-medium">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg text-slate-700"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-slate-700 font-medium">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg text-slate-700"
            >
              <option value="food">Food</option>
              <option value="shopping">Shopping</option>
              <option value="transport">Transport</option>
              <option value="bills">Bills</option>
              <option value="salary">Salary</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-slate-700 font-medium">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg text-slate-700"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700 font-medium">
              Notes (optional)
            </label>
            <textarea
              placeholder="Add notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg placeholder-slate-400 text-slate-700 bg-white"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
