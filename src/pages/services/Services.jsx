import React, { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Container from "../../components/shared/Container";
import { FaBuffer, FaEdit, FaPrint, FaTrashAlt, FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import * as XLSX from "xlsx";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";
import Table from "../../components/shared/Table";
import { CiEdit } from "react-icons/ci";
import apiServiceCall from "../../utils/apiServiceCall";

const Services = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  
  const [searchSection, setSearchSection] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchBarcode, setSearchBarcode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // استرجاع البيانات من API مع إعادة المحاولة
  const { 
    data: productsResponse, 
    isLoading, 
    error,
    refetch,
    isError 
  } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => apiServiceCall({
      url: `/products?page=${currentPage}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    retry: 2, // إعادة المحاولة مرتين
    retryDelay: 1000, // انتظار ثانية بين المحاولات
    staleTime: 5 * 60 * 1000, // 5 دقائق
  });

  // بيانات تجريبية للطوارئ
  const fallbackData = {
    data: [
      {
        id: 1,
        name: "خدمة تجريبية 1",
        barcode: "123456789",
        sale_price: 100,
        cost_price: "50",
        category: { name: "التصوير" },
        unit: { name: "وحدة" },
        creator: { name: "مسؤول", phone: "0551234567", email: "admin@example.com" }
      },
      {
        id: 2,
        name: "خدمة تجريبية 2", 
        barcode: "987654321",
        sale_price: 200,
        cost_price: "100",
        category: { name: "التنظيم" },
        unit: { name: "وحدة" },
        creator: { name: "مسؤول", phone: "0551234567", email: "admin@example.com" }
      }
    ],
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 2
    },
    has_quantity_count: 2,
    no_quantity_count: 0
  };

  const effectiveData = isError ? fallbackData : productsResponse;

  // طفرة لحذف المنتج
  const deleteMutation = useMutation({
    mutationFn: (productId) => apiServiceCall({
      url: `/products/${productId}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    onSuccess: () => {
      toast.success('تم حذف المنتج بنجاح');
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      toast.error('فشل في حذف المنتج');
      console.error('Error deleting product:', error);
    }
  });

  // تحويل البيانات من API إلى الشكل المطلوب
  const services = useMemo(() => {
    if (!effectiveData?.data) return [];
    
    return effectiveData.data.map(product => ({
      id: product.id,
      name: product.name,
      section: product.category?.name || "بدون قسم",
      barcode: product.barcode,
      phone: product.creator?.phone || "غير متوفر",
      email: product.creator?.email || "غير متوفر",
      halls: product.unit?.name || "غير متوفر",
      sale_price: product.sale_price,
      cost_price: product.cost_price,
      image: product.image,
      barcode_image: product.barcode_image,
      allow_quantity: product.allow_quantity,
      is_default_in_rent: product.is_default_in_rent,
      category: product.category,
      unit: product.unit,
      creator: product.creator,
      components: product.components
    }));
  }, [effectiveData]);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "اسم الخدمة", key: "name" },
    { label: "القسم", key: "section" },
    { label: "الباركود", key: "barcode" },
    { label: "سعر البيع", key: "sale_price" },
    { label: "سعر التكلفة", key: "cost_price" },
    { label: "الوحدة", key: "halls" },
    { label: "التحكم", key: "actions" },
  ];

  // فلترة البيانات
  const filteredServices = useMemo(() => {
    return services.filter((s) =>
      s.section.toLowerCase().includes(searchSection.trim().toLowerCase()) &&
      s.name.toLowerCase().includes(searchName.trim().toLowerCase()) &&
      s.barcode.includes(searchBarcode.trim())
    );
  }, [searchSection, searchName, searchBarcode, services]);

  // إضافة أزرار التحكم
  const dataWithActions = filteredServices.map((s) => ({
    ...s,
    sale_price: `$${s.sale_price}`,
    cost_price: `$${s.cost_price}`,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedService(s);
            setEditModalOpen(true);
          }}
          className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
        >
          <CiEdit size={24} />
        </button>
        <button
          onClick={() => {
            setSelectedService(s);
            setDeleteModalOpen(true);
          }}
          className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    ),
  }));

  // إضافة خدمة جديدة
  const handleAddService = (newService) => {
    // هنا سيتم إضافة API call لإضافة منتج جديد
    setAddModalOpen(false);
  };

  // تحديث خدمة
  const handleUpdateService = (updatedService) => {
    // هنا سيتم إضافة API call لتحديث المنتج
    setEditModalOpen(false);
    setSelectedService(null);
  };

  // حذف خدمة
  const handleDeleteService = () => {
    if (selectedService) {
      deleteMutation.mutate(selectedService.id);
    }
    setDeleteModalOpen(false);
    setSelectedService(null);
  };

  // تصدير Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(services);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "الخدمات");
    XLSX.writeFile(workbook, "الخدمات.xlsx");
  };

  // الطباعة
  const handlePrint = () => {
    window.print();
  };

  // التبديل بين الصفحات
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // إعادة تحميل البيانات
  const handleRetry = () => {
    refetch();
  };

  return (
    <Container>
      <div className="p-4 min-h-screen my-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-bold mb-4">الخدمات</h2>
          
        </div>

        <div className="bg-white mt-5 shadow-lg p-5 rounded-lg">
          {/* رسالة الخطأ */}
          {isError && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              <strong>ملاحظة:</strong> يتم عرض بيانات تجريبية بسبب مشكلة في الاتصال بالخادم.
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
            {/* اللينكات */}
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
              <Link
                to="/services/offers"
                className="flex items-center justify-center gap-2 text-white bg-[#2ba670] rounded-md px-3 h-[40px] w-full md:w-auto"
              >
                <FaBagShopping />
                <span>العروض</span>
              </Link>
              <Link
                to="/services/categories"
                className="flex items-center justify-center gap-2 text-white bg-[#2ba670] rounded-md px-3 h-[40px] w-full md:w-auto"
              >
                <FaBuffer />
                <span>الأقسام</span>
              </Link>
            </div>

            {/* الأزرار */}
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setAddModalOpen(true)}
                className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
              >
                أضف خدمة +
              </button>
              <Link
                to='/services/units'
                className="bg-[#2ba670] flex items-center justify-center px-4 h-[40px] text-white rounded-md w-full md:w-auto"
              >
                الوحدات
              </Link>
              <button
                onClick={exportToExcel}
                className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
              >
                تصدير أكسل
              </button>
              <button
                onClick={handlePrint}
                className="bg-yellow-400 px-4 h-[40px] text-white rounded-md w-full md:w-auto"
              >
                <FaPrint />
              </button>
            </div>
          </div>

          {/* البحث */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0 mt-5">
            <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="البحث بالقسم"
                className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-[200px]"
                onChange={(e) => setSearchSection(e.target.value)}
                value={searchSection}
              />
              <input
                type="text"
                placeholder="البحث بالإسم"
                className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-[200px]"
                onChange={(e) => setSearchName(e.target.value)}
                value={searchName}
              />
              <input
                type="text"
                placeholder="البحث بالباركود"
                className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-[200px]"
                onChange={(e) => setSearchBarcode(e.target.value)}
                value={searchBarcode}
              />
            </div>

            <select className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-auto">
              <option>كل الخدمات : {services.length}</option>
              <option>خدمات منتهية الكمية : {effectiveData?.no_quantity_count || 0}</option>
              <option>خدمات منتهية الصلاحية : 0</option>
            </select>
          </div>

          {/* حالة التحميل */}
          {isLoading ? (
            null
          ) : (
            <>
              {/* الجدول */}
              <div className="mt-6">
                <Table columns={columns} data={dataWithActions} />
              </div>

              {/* الترقيم */}
              {effectiveData?.pagination && effectiveData.pagination.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    السابق
                  </button>
                  
                  {Array.from({ length: Math.min(5, effectiveData.pagination.last_page) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page ? 'bg-[#2ba670] text-white' : 'bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === effectiveData.pagination.last_page}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    التالي
                  </button>
                  
                  <span className="text-sm text-gray-600">
                    الصفحة {currentPage} من {effectiveData.pagination.last_page}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* المودالات */}
      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddService}
      />

      <EditServiceModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleUpdateService}
        service={selectedService}
      />

      <DeleteServiceModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteService}
        service={selectedService}
      />
    </Container>
  );
};

export default Services;