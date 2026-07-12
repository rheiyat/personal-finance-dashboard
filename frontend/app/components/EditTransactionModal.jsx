"use client";
import { useState, useEffect } from "react";

export default function EditTransactionModal({ open, onClose, onUpdated, transaction }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState( "");

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setType(transaction.type);
      setCategory(transaction.category);
      setDate(transaction.date?.slice(0, 10));
      setNotes(transaction.notes || "");
    }
  }, [transaction]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5050/transactions/${transaction._id}`, {
      method: "PUT",
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

    onUpdated();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">
          Edit Transaction
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-slate-700 font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg text-slate-700"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700 font-medium">Type</label>
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
            <label className="block mb-1 text-slate-700 font-medium">Category</label>
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
            <label className="block mb-1 text-slate-700 font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg text-slate-700"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700 font-medium">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg text-slate-700"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
