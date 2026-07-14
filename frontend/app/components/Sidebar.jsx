"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 p-6 border-r border-slate-700">
      <h2 className="text-xl font-semibold mb-8 text-white">
        Finance Dashboard
      </h2>

      <nav className="space-y-4">
        <Link href="/dashboard" className="block text-slate-300 hover:text-indigo-400 transition">
          Home
        </Link>

        <Link href="/transactions" className="block text-slate-300 hover:text-indigo-400 transition">
          Transactions
        </Link>

        <Link href="/budgets" className="block text-slate-300 hover:text-indigo-400 transition">
          Budgets
        </Link>

        <Link href="/goals" className="block text-slate-300 hover:text-indigo-400 transition">
          Goals
        </Link>
      </nav>
    </aside>
  );
}
