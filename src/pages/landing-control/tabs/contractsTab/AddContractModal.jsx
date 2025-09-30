import React, { useState } from "react";

const AddContractModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    clientName: "",
    contractTitle: "",
    startDate: "",
    endDate: "",
    amount: "",
    remainingDays: "",
    attachment: null,
  });
  const [fileName, setFileName] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setFileName(files[0].name);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold mb-4">إضافة عقد جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* استخدام grid: عمود واحد على sm، عمودين على md وأكبر */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-1 font-medium">اسم العميل</label>
              <input
                type="text"
                name="clientName"
                placeholder="أدخل اسم العميل"
                value={form.clientName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">عنوان العقد</label>
              <input
                type="text"
                name="contractTitle"
                placeholder="أدخل عنوان العقد"
                value={form.contractTitle}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">تاريخ البداية</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">تاريخ النهاية</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">المبلغ</label>
              <input
                type="number"
                name="amount"
                placeholder="المبلغ"
                value={form.amount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">المتبقي بالأيام</label>
              <input
                type="number"
                name="remainingDays"
                placeholder="المتبقي بالأيام"
                value={form.remainingDays}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

          </div>

          {/* حقل المرفق كامل العرض */}
          <div>
            <label className="block mb-1 font-medium">المرفق</label>
            <div
              className="w-full h-28  border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer p-4"
              onClick={() => document.getElementById("attachmentInput").click()}
            >
              {fileName ? (
                <span>{fileName}</span>
              ) : (
                <span className="text-gray-400">اضغط لإضافة مرفق</span>
              )}
            </div>
            <input
              id="attachmentInput"
              type="file"
              name="attachment"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContractModal;
