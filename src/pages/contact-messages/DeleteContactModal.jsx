import React, { useState } from "react";
import { toast , ToastContainer } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";

const DeleteContactModal = ({ message, onClose, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

const handleDelete = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log("🔑 Token:", token);

    const res = await apiServiceCall({
      url: `contact/messages/${message.id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("🛰️ DELETE Response:", res);

    if (res?.status) {
      toast.success("تم حذف الرسالة بنجاح ");
      onDeleteSuccess(message.id);
        setTimeout(() => {
      onClose();
    }, 1000);

    setTimeout(() => {
      window.location.reload()
    }, 1500);
    } else {
      toast.error(res?.message || "فشل حذف الرسالة ");
    }
  } catch (err) {
    console.error(" خطأ أثناء حذف الرسالة:", err);
    toast.error("حدث خطأ أثناء حذف الرسالة");
  } finally {
    setLoading(false);
  }
};


  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <ToastContainer/>
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg transform transition-all duration-300 scale-100">
        <h2 className="text-lg font-bold mb-4 text-center text-red-600">
          هل أنت متأكد من حذف هذه الرسالة؟
        </h2>

        <p className="mb-4 text-center text-gray-700">
          ({message.name} - {message.phone})
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition disabled:opacity-50"
          >
            إلغاء
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition disabled:opacity-50"
          >
            {loading ? "جاري الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContactModal;
