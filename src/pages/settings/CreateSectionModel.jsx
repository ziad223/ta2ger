import React, { useState } from 'react';

export default function CreateSectionModel({ onClose, onSave }) {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name.trim()) {
      onSave({ name: name.trim() });
      setName('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="font-bold mb-4 text-lg">إضافة قسم جديد</h3>
        <div className="space-y-3">
          <input
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="اسم القسم"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={!name.trim()}
          >
            إضافة
          </button>
        </div>
      </div>
    </div>
  );
}