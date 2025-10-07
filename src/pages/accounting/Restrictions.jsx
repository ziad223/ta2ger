"use client";

import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";
import { FaArrowLeftLong, FaPlus, FaPrint } from "react-icons/fa6";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import Table from "../../components/shared/Table";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import { CiEdit } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import apiServiceCall from "../../utils/apiServiceCall";
import { toast } from "react-toastify";

const Restrictions = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // جلب البيانات من API
  const { data: entries, isLoading, refetch } = useQuery({
    queryKey: ["journalEntries"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await apiServiceCall({
        url: "journal-entries",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.status) throw new Error("حدث خطأ أثناء جلب البيانات");
      return response.data;
    },
    onError: (err) => {
      console.error(err);
      toast.error("فشل في جلب البيانات");
    },
  });

  const columns = [
    { key: "id", label: "#" },
    { key: "code", label: "الكود" },
    { key: "entry_date", label: "التاريخ" },
    { key: "reference", label: "المرجع" },
    { key: "description", label: "الوصف" },
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          {/* معاينة */}
          <button
            onClick={() => {
              setSelectedRow(row);
              setViewOpen(true);
            }}
            className="p-2 bg-[#8e44ad] text-white rounded-md"
          >
            <FaEye className="text-lg" />
          </button>

          {/* تعديل */}
          <button
            onClick={() => {
              setSelectedRow(row);
              setEditOpen(true);
            }}
            className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
          >
            <CiEdit size={24} />
          </button>

          {/* حذف */}
          <button
            onClick={async () => {
              if (window.confirm("هل أنت متأكد من حذف هذا القيد؟")) {
                try {
                  const token = localStorage.getItem("token");
                  await apiServiceCall({
                    url: `journal-entries/${row.id}`,
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  toast.success("تم الحذف بنجاح");
                  refetch(); // إعادة تحميل البيانات بعد الحذف
                } catch (err) {
                  console.error(err);
                  toast.error("فشل الحذف");
                }
              }
            }}
            className="p-2 bg-[#dc3545] text-white rounded-md"
          >
            <FaRegTrashAlt className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="text-center mt-10">جاري التحميل...</div>;

  return (
    <div className="my-20 min-h-screen">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/accounting" className="bg-gray-500 rounded-lg p-2 text-white font-semibold cursor-pointer">
                <FaArrowLeftLong />
              </Link>
              <h2 className="text-xl font-bold">القيود اليومية</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-md text-white bg-[#09adce] font-bold hover:bg-[#0b9cb9] transition">
                <FaPlus className="text-lg" />
                <span>إضافة قيد</span>
              </button>
              <button className="flex items-center justify-center w-[42px] h-[42px] rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition">
                <FaPrint className="text-lg" />
              </button>
            </div>
          </div>

          {/* الجدول */}
          <Table columns={columns} data={entries || []} />
        </div>
      </Container>

      {/* مودال المعاينة */}
      {viewOpen && <ViewModal row={selectedRow} onClose={() => setViewOpen(false)} />}

      {/* مودال التعديل */}
      {editOpen && (
        <EditModal
          row={selectedRow}
          onClose={() => setEditOpen(false)}
          onSave={async (updated) => {
            try {
              const token = localStorage.getItem("token");
              await apiServiceCall({
                url: `journal-entries/${updated.id}`,
                method: "PUT",
                body: updated,
                headers: { Authorization: `Bearer ${token}` },
              });
              toast.success("تم التعديل بنجاح");
              refetch(); // إعادة تحميل البيانات بعد التعديل
              setEditOpen(false);
            } catch (err) {
              console.error(err);
              toast.error("فشل التعديل");
            }
          }}
        />
      )}
    </div>
  );
};

export default Restrictions;
