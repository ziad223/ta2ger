// ViewInvoiceModal.jsx
import React from "react";

const ViewInvoiceModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#8e44ad] text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">معاينة الفاتورة #{invoice.id}</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl leading-none hover:text-gray-200"
          >
            ×
          </button>
        </div>

        {/* محتوى الفاتورة */}
        <div className="p-6 space-y-4 text-right">
          <div className="grid grid-cols-2 gap-4">
            <p><span className="font-semibold">العميل:</span> {invoice.client}</p>
            <p><span className="font-semibold">التاريخ:</span> {invoice.date}</p>
            <p><span className="font-semibold">المبلغ:</span> {invoice.amount} ر.س</p>
            <p><span className="font-semibold">الضريبة:</span> {invoice.tax} ر.س</p>
            <p><span className="font-semibold">الإجمالي:</span> {invoice.total} ر.س</p>
            <p><span className="font-semibold">المتبقي:</span> {invoice.remaining} ر.س</p>
            <p><span className="font-semibold">الحالة:</span> {invoice.status}</p>
            <p><span className="font-semibold">طريقة الدفع:</span> {invoice.paymentMethod}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 flex justify-end border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoiceModal;
