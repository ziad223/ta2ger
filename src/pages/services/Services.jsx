import React, { useState, useMemo } from "react";
import Container from "../../components/shared/Container";
import { FaBuffer, FaEdit, FaPrint, FaTrashAlt } from "react-icons/fa";
import { Link, Links } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import * as XLSX from "xlsx";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";
import Table from "../../components/shared/Table";

const Services = () => {
  const [services, setServices] = useState([
    { id: 1, name: "باقة تصوير", section: "تصوير", barcode: "111", phone: "0551234567", email: "mohamed@example.com", halls: "قاعة الأندلس" },
    { id: 2, name: "تنظيم حفلات", section: "تنظيم", barcode: "222", phone: "0567890123", email: "ahmed@example.com", halls: "قاعة الفيصل" },
    { id: 3, name: "إيجار كراسي", section: "تأجير", barcode: "333", phone: "0579998887", email: "sara@example.com", halls: "قاعة الماسة" },
    { id: 4, name: "إيجار طاولات", section: "تأجير", barcode: "444", phone: "0546662221", email: "ali@example.com", halls: "قاعة اللوتس" },
    { id: 5, name: "بوفيه مفتوح", section: "طعام", barcode: "555", phone: "0591112223", email: "huda@example.com", halls: "قاعة الورد" },
    { id: 6, name: "تنسيق ورود", section: "ديكور", barcode: "666", phone: "0587774449", email: "yousef@example.com", halls: "قاعة الزهور" },
  ]);

  const [searchSection, setSearchSection] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchBarcode, setSearchBarcode] = useState("");

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "اسم الخدمة", key: "name" },
    { label: "القسم", key: "section" },
    { label: "الباركود", key: "barcode" },
    { label: "الجوال", key: "phone" },
    { label: "البريد الإلكتروني", key: "email" },
    { label: "القاعات", key: "halls" },
    { label: "التحكم", key: "actions" },
  ];

  const filteredServices = useMemo(() => {
    return services.filter((s) =>
      s.section.includes(searchSection.trim()) &&
      s.name.includes(searchName.trim()) &&
      s.barcode.includes(searchBarcode.trim())
    );
  }, [searchSection, searchName, searchBarcode, services]);

  const dataWithActions = filteredServices.map((s) => ({
    ...s,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedService(s);
            setEditModalOpen(true);
          }}
          className="text-white text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaEdit size={16} />
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

  const handleAddService = (newService) => {
    const id = services.length ? services[services.length - 1].id + 1 : 1;
    setServices([...services, { ...newService, id }]);
    setAddModalOpen(false);
  };

  const handleUpdateService = (updatedService) => {
    setServices(services.map((s) => (s.id === updatedService.id ? updatedService : s)));
    setEditModalOpen(false);
    setSelectedService(null);
  };

  // حذف خدمة
  const handleDeleteService = () => {
    setServices(services.filter((s) => s.id !== selectedService.id));
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

  return (
    <Container>
      <div className="p-4 min-h-screen my-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-bold mb-4">الخدمات</h2>
          <button
            onClick={() => setAddModalOpen(true)}
            className="bg-[#2ba670] px-3 h-[35px] text-white rounded-md"
          >
            أضف خدمة +
          </button>
        </div>

        <div className="bg-white mt-5 shadow-lg p-5 rounded-lg">
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
            <div className="flex items-center gap-2">
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
              <option>خدمات منتهية الكمية : 2</option>
              <option>خدمات منتهية الصلاحية : 1</option>












            </select>
          </div>

          {/* الجدول */}
          <div className="mt-6">
            <Table columns={columns} data={dataWithActions} />
          </div>
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
