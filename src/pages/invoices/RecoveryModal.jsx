import React from "react";

const RecoveryModal = ({ isOpen, onClose, amountPaid, totalAmount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative ">
        {/* 关闭按钮 */}
        <div className="flex justify-between w-full">
          <button
            onClick={onClose}
            className="absolute top-3 left-3 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* 标题 */}
          <div className="text-right px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">استرجاع فاتورة</h3>
          </div>
        </div>

        {/* 内容 */}
        <div className="p-6 space-y-4">
          {/* 金额信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                المحدد
              </label>
              <div className="bg-gray-100 rounded-md px-3 py-2 text-center">
                {amountPaid || "1500"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-right mb-1">
                المجموع
              </label>
              <div className="bg-gray-100 rounded-md px-3 py-2 text-center">
                {totalAmount || "1500"}
              </div>
            </div>
          </div>

          {/* 类型选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-1">
              نوع الاسترجاع
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-right">
              <option>أختار نوع الاسترجاع</option>
              <option>استرجاع مال</option>
              <option>استرجاع خدمة</option>
              <option>استرجاع آخر</option>
            </select>
          </div>

          {/* 方式选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-1">
              طريقة الاسترجاع
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-right">
              <option>أختار طريقة الاسترجاع</option>
              <option>نقدي</option>
              <option>شبكة</option>
              <option>تحويل بنكي</option>
            </select>
          </div>
        </div>

        {/* 按钮 */}
        <div className="flex justify-end p-6 border-t gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md mr-2 hover:bg-gray-300"
          >
            إلغاء
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            نعم
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecoveryModal;
