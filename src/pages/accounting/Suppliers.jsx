"use client";
import React, { useEffect, useState } from "react";
import Container from "../../components/shared/Container";
import Table from "../../components/shared/Table";
import { FaChevronRight } from "react-icons/fa";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import apiServiceCall from "../../utils/apiServiceCall";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import EditSupplierModal from "./EditSupplierModal";
import AddSupplierModal from "./AddSupplierModal";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ حالات الباجينيشن
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // ✅ جلب الموردين مع الباجينيشن
  const fetchSuppliers = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await apiServiceCall({
        url: `suppliers?page=${page}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.status && Array.isArray(response?.data)) {
        setSuppliers(response.data);
        setLastPage(response.pagination?.last_page || 1);
      } else {
        toast.error(response?.message || "فشل في جلب الموردين ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء جلب الموردين ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers(currentPage);
  }, [currentPage]);

  // ✅ إضافة مورد
  const handleAddSupplier = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiServiceCall({
        url: "suppliers",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (res?.status) {
        toast.success("تمت إضافة المورد بنجاح ✅");
        setOpenAddModal(false);
        fetchSuppliers(currentPage);
      } else {
        toast.error(res?.message || "فشل الإضافة ❌");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الإضافة ❌");
    }
  };

  // ✅ تعديل مورد
  const handleEditSupplier = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiServiceCall({
        url: `suppliers/${data.id}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (res?.status) {
        toast.success("تم تعديل المورد بنجاح ✅");
        setOpenEditModal(false);
        fetchSuppliers(currentPage);
      } else {
        toast.error(res?.message || "فشل التعديل ❌");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء التعديل ❌");
    }
  };

  // ✅ تصدير إلى Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(suppliers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "الموردين");
    XLSX.writeFile(workbook, "قائمة-الموردين.xlsx");
  };

  // ✅ الأعمدة
  const columns = [
    { key: "id", label: "رقم المورد" },
    { key: "name", label: "اسم المورد" },
    { key: "tax_number", label: "الرقم الضريبي" },
    { key: "phone", label: "رقم الهاتف" },
    { key: "street", label: "العنوان" },
    { key: "company", label: "الشركة" },
    {
      key: "actions",
      label: "التحكم",
      render: (supplier) => (
        <button
          onClick={() => {
            setSelectedSupplier(supplier);
            setOpenEditModal(true);
          }}
          className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
        >
          <CiEdit size={22} />
        </button>
      ),
    },
  ];

  return (
    <div className="my-20 min-h-screen">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-5">
          {/* ✅ العنوان + زر إضافة مورد */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Link
                to="/accounting"
                className="bg-gray-500 rounded-lg p-2 text-white font-semibold cursor-pointer"
              >
                <FaChevronRight />
              </Link>
              <h2 className="text-xl font-bold">الموردين</h2>
            </div>
            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-[#09adce] text-white px-4 py-2 rounded-md hover:bg-[#0b9cb9]"
            >
              إضافة مورد
            </button>
          </div>

          {/* ✅ الجدول */}
          {loading ? (
            null
          ) : (
            <Table columns={columns} data={suppliers} />
          )}

          {/* ✅ الباجينيشن */}
          {lastPage > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-1.5 rounded-md font-medium transition ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#0dcaf0] text-white hover:bg-[#0bb4d8]"
                }`}
              >
                السابق
              </button>

              {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md font-semibold border transition ${
                    page === currentPage
                      ? "bg-[#0dcaf0] text-white border-[#0dcaf0]"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
                disabled={currentPage === lastPage}
                className={`px-4 py-1.5 rounded-md font-medium transition ${
                  currentPage === lastPage
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#0dcaf0] text-white hover:bg-[#0bb4d8]"
                }`}
              >
                التالي
              </button>
            </div>
          )}
        </div>
      </Container>

      {/* ✅ مودالات */}
      {openAddModal && (
        <AddSupplierModal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onSave={handleAddSupplier}
        />
      )}

      {openEditModal && selectedSupplier && (
        <EditSupplierModal
          supplier={selectedSupplier}
          onClose={() => setOpenEditModal(false)}
          onSave={handleEditSupplier}
        />
      )}
    </div>
  );
};

export default Suppliers;
