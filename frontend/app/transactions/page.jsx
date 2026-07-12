"use client";
import { useEffect, useState } from "react";
import AddTransactionModal from "../components/AddTransactionModal";
import DeleteModal from "../components/DeleteModal";
import EditTransactionModal from "../components/EditTransactionModal";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function TransactionsPage() {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editTransaction, setEditTransaction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function refreshTransactions() {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5050/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setTransactions(data);
      setFiltered(data);
    } else {
      setTransactions([]);
      setFiltered([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    refreshTransactions();
  }, []);

  useEffect(() => {
    let temp = [...transactions];

    if (category) {
      temp = temp.filter((t) => t.category === category);
    }

    if (search.trim() !== "") {
      temp = temp.filter(
        (t) =>
          t.category.toLowerCase().includes(search.toLowerCase()) ||
          (t.notes && t.notes.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (startDate) {
      temp = temp.filter((t) => new Date(t.date) >= new Date(startDate));
    }

    if (endDate) {
      temp = temp.filter((t) => new Date(t.date) <= new Date(endDate));
    }

    setFiltered(temp);
  }, [category, search, startDate, endDate, transactions]);

  async function handleDelete() {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5050/transactions/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    await refreshTransactions();
    setShowDeleteModal(false);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">

      {/* Top Bar */}
      <TopBar />

      {/* Main Layout */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Transactions</h1>

            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg transition"
            >
              Add Transaction
            </button>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl mb-8 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className="grid grid-cols-4 gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
              >
                <option value="">All Categories</option>
                <option value="food">Food</option>
                <option value="shopping">Shopping</option>
                <option value="transport">Transport</option>
                <option value="bills">Bills</option>
                <option value="salary">Salary</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                placeholder="Search notes or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
              />

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
              />
            </div>
          </div>

          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : (
            <div className="bg-white rounded-xl shadow border border-slate-200 p-6">
              <table className="w-full text-slate-800">
                <thead>
                  <tr className="border-b border-slate-300 text-left">
                    <th className="py-3">Amount</th>
                    <th className="py-3">Category</th>
                    <th className="py-3">Date</th>
                    <th className="py-3">Notes</th>
                    <th className="py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(filtered) &&
                    filtered.map((t) => (
                      <tr key={t._id} className="border-b border-slate-200">
                        <td className="py-3 font-semibold">
                          {t.type === "income" ? (
                            <span className="text-emerald-600">+${t.amount}</span>
                          ) : (
                            <span className="text-rose-600">-${t.amount}</span>
                          )}
                        </td>

                        <td className="py-3 capitalize">{t.category}</td>

                        <td className="py-3">
                          {new Date(t.date).toLocaleDateString()}
                        </td>

                        <td className="py-3">{t.notes || "—"}</td>

                        <td className="py-3 space-x-3">
                          <button
                            className="text-indigo-500 hover:underline"
                            onClick={() => {
                              setEditTransaction(t);
                              setShowEditModal(true);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="text-rose-500 hover:underline"
                            onClick={() => {
                              setDeleteId(t._id);
                              setShowDeleteModal(true);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modals */}
          <AddTransactionModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onAdded={refreshTransactions}
          />

          <DeleteModal
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />

          <EditTransactionModal
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            transaction={editTransaction}
            onUpdated={refreshTransactions}
          />
        </main>
      </div>
    </div>
  );
}
