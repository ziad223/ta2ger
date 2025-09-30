import React, { useState } from "react";
import { FaChevronLeft, FaPrint } from "react-icons/fa";
import logo from "../../../public/images/home/login-logo.png";
import CreateBondModel from "./CreateBondModel";

const Bond = () => {
  const [createBondModalOpen, setCreateBondModalOpen] = useState(false);
  return (
    <div className="my-10 min-h-screen px-3 sm:px-5">
      <div className="w-full lg:w-[70%] mx-auto">
        {/* زر الطباعة والرجوع */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">سندات الفاتورة 62</h1>
          </div>

          {/* زر الرجوع */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 w-full sm:w-auto justify-center"
          >
            <span>رجوع</span>
            <span className="text-sm mt-1">
              <FaChevronLeft />
            </span>
          </button>
        </div>

        {/* البوكس الأساسي */}
        <div className="p-3 sm:p-5 bg-white shadow-lg rounded-lg mt-5">
          {/* الأزرار العلوية */}
          <div className="flex gap-2 mb-4 justify-end">
            <button
              type="button"
              className="bg-yellow-500 text-white  px-3 rounded-md flex items-center gap-1"
            >
              <FaPrint />
            </button>
            <button
              type="button"
              className="bg-green-500 text-white px-3 py-1 rounded-md flex items-center gap-1"
              onClick={() => setCreateBondModalOpen(true)}
            >
              <span>+</span> أضف سند
            </button>
          </div>

          {/* الجدول */}
          <div className="border border-gray-300 rounded-md overflow-hidden mb-4 ">
            <div className="grid grid-cols-8 border-b border-gray-300">
              <div className="p-2 text-right font-medium">رقم الفاتورة</div>
              <div className="p-2 text-right font-medium">المبلغ</div>
              <div className="p-2 text-right font-medium">المتبقي</div>
              <div className="p-2 text-right font-medium">الموظف</div>
              <div className="p-2 text-right font-medium">العميل</div>
              <div className="p-2 text-right font-medium">التاريخ</div>
              <div className="p-2 text-right font-medium">الحالة</div>
              <div className="p-2 text-right font-medium">طريقة الدفع</div>
            </div>

            <div className="grid grid-cols-8 p-2 bg-gray-50">
              <div className="p-2 text-right">1150.00</div>
              <div className="p-2 text-right">1000.00</div>
              <div className="p-2 text-right">150.00</div>
              <div className="p-2 text-right">العميل</div>
              <div className="p-2 text-right">الموظف</div>
              <div className="p-2 text-right">2025-09-18</div>
              <div className="p-2 text-right">مدعومة جزئيا</div>
              <div className="p-2 text-right">إجراءات</div>
            </div>
          </div>

          {/* ملخص الفاتورة */}
          <div className="border border-gray-300 rounded-md p-4 " dir="ltr">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="bg-yellow-500 text-white px-2 py-1 rounded-md text-sm">
                  مدعومة جزئيا
                </span>
                <span className="font-medium">حالة الفاتورة:</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">المبلغ المتبقي:</span>
                <span>150.00</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">المبلغ المسدد:</span>
                <span>1000.00</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">إجمالي الفاتورة:</span>
                <span>1150.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {createBondModalOpen && (
        <CreateBondModel
          isOpen={createBondModalOpen}
          onClose={() => setCreateBondModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Bond;
