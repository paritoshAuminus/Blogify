import React from "react";

function DeletePopup({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-lg font-semibold text-[#0F2854] mb-2">
          Delete Blog
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this blog? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
