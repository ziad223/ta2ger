import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import CustomSelect from "../../components/shared/CustomSelect";
import Table from "../../components/shared/Table";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import EditExpenseModal from "./EditExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";

const Expenses = () => {
  const [selectedHall, setSelectedHall] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const hallOptions = [
    { value: "hall1", label: "قاعة 1" },
    { value: "hall2", label: "قاعة 2" },
    { value: "hall3", label: "قاعة 3" },
  ];

  const [data, setData] = useState([
    {
      id: 1,
      hall: "قاعة 1",
      amount: 26755,
      tax: 13426.05,
      total: 40181.05,
      date: "2025-10-01",
    },
    {
      id: 2,
      hall: "قاعة 2",
      amount: 14550,
      tax: 0,
      total: 14550,
      date: "2025-10-02",
    },
    {
      id: 3,
      hall: "قاعة 3",
      amount: 1380,
      tax: 0,
      total: 1380,
      date: "2025-10-03",
    },
    {
      id: 4,
      hall: "الإجمالي",
      amount: 42685,
      tax: 13426.05,
      total: 56108.05,
      date: "",
    },
  ]);

  const columns = [
    { key: "id", label: "#" },
    { key: "hall", label: "اسم القاعة" },
    { key: "amount", label: "المبلغ" },
    { key: "tax", label: "الضريبة" },
    { key: "total", label: "المجموع" },
    { key: "date", label: "التاريخ" },
    {
      key: "actions",
      label: "التحكم",
      render: (row) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setEditData(row)}
            className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
          >
            <CiEdit size={20} />
          </button>
          <button
            onClick={() => setDeleteData(row)}
            className="text-white bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
          >
            <FaTrashAlt size={14} />
          </button>
        </div>
      ),
    },
  ];

  const handleSave = (updated) => {
    setData((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditData(null);
  };

  const handleDelete = () => {
    setData((prev) => prev.filter((item) => item.id !== deleteData.id));
    setDeleteData(null);
  };

  return (
    <div className="my-20 min-h-screen">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-5">
          {/* ====== العنوان ====== */}
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/report"
              className="bg-gray-500 rounded-lg p-2 text-white font-semibold cursor-pointer"
            >
              <FaChevronRight />
            </Link>
            <h2 className="text-xl font-bold mt-1">المصروفات</h2>
          </div>

          {/* ====== الحقول ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                إجمالي المبالغ
              </label>
              <input
                type="text"
                value="10.00"
                readOnly
                className="border border-gray-300 rounded-md px-3 py-1 bg-gray-100 text-gray-700"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                إجمالي الضريبة
              </label>
              <input
                type="text"
                value="0.00"
                readOnly
                className="border border-gray-300 rounded-md px-3 py-1 bg-gray-100 text-gray-700"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                إجمالي الإجمالي
              </label>
              <input
                type="text"
                value="10.00"
                readOnly
                className="border border-gray-300 rounded-md px-3 py-1 bg-gray-100 text-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 mb-8">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                من تاريخ
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#09adce]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                إلى تاريخ
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#09adce]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                القاعة
              </label>
              <CustomSelect
                options={hallOptions}
                value={selectedHall}
                onChange={setSelectedHall}
                placeholder="اختر القاعة"
              />
            </div>
          </div>

          {/* ====== الجدول ====== */}
          <Table columns={columns} data={data} />
        </div>
      </Container>

      {/* ====== مودالات ====== */}
      {editData && (
        <EditExpenseModal
          isOpen={!!editData}
          expenseData={editData}
          onSave={handleSave}
          onClose={() => setEditData(null)}
        />
      )}

      {deleteData && (
        <DeleteExpenseModal
          isOpen={!!deleteData}
          hallName={deleteData.hall}
          onConfirm={handleDelete}
          onClose={() => setDeleteData(null)}
        />
      )}
    </div>
  );
};

export default Expenses;
