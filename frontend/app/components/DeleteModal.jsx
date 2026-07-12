"use client";
export default function DeleteModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Delete Transaction
        </h2>

        <p className="text-slate-600 mb-6">
          Are you sure you want to delete this transaction? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
