import React from "react";

const EditExpenseModal = ({ isOpen, onClose, expenseData, onSave }) => {
  if (!isOpen || !expenseData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] md:w-[500px] rounded-lg shadow-lg p-6 relative">
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
          تعديل بيانات المصروف
        </h2>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">اسم القاعة</label>
            <input
              type="text"
              value={expenseData.hall}
              readOnly
              className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">المبلغ</label>
            <input
              type="number"
              value={expenseData.amount}
              onChange={(e) =>
                onSave({ ...expenseData, amount: Number(e.target.value) })
              }
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">الضريبة</label>
            <input
              type="number"
              value={expenseData.tax}
              onChange={(e) =>
                onSave({ ...expenseData, tax: Number(e.target.value) })
              }
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">المجموع</label>
            <input
              type="number"
              value={expenseData.total}
              onChange={(e) =>
                onSave({ ...expenseData, total: Number(e.target.value) })
              }
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">التاريخ</label>
            <input
              type="date"
              value={expenseData.date}
              onChange={(e) =>
                onSave({ ...expenseData, date: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            إلغاء
          </button>
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 rounded-md bg-[#09adce] text-white hover:bg-[#0a91af]"
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
