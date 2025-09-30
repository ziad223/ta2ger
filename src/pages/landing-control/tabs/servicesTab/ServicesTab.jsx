import React, { useState, useMemo } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Table from "../../../../components/shared/Table";
import AddServiceModal from "./AddServiceModal";
import EditServiceModal from "./EditServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";

const ServicesTab = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "خدمة التصوير",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "خدمة الضيافة",
      image: "https://via.placeholder.com/80",
    },
  ]);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "اسم الخدمة", key: "name" },
    {
      label: "الصورة",
      key: "image",
      render: (row) => (
        <img src={row.image} alt={row.name} className="w-16 h-16 mx-auto object-cover rounded-md" />
      ),
    },
    { label: "الإجراءات", key: "actions" },
  ];

  // دمج الإجراءات مع البيانات
  const dataWithActions = useMemo(
    () =>
      services.map((service) => ({
        ...service,
        actions: (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setSelectedService(service);
                setEditModalOpen(true);
              }}
              className="text-white text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={() => {
                setSelectedService(service);
                setDeleteModalOpen(true);
              }}
              className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
            >
              <FaTrashAlt size={14} />
            </button>
          </div>
        ),
      })),
    [services]
  );

  // إضافة خدمة جديدة
  const handleAddService = (newService) => {
    const id = services.length ? services[services.length - 1].id + 1 : 1;
    setServices([...services, { ...newService, id }]);
    setAddModalOpen(false);
  };

  // تعديل خدمة
  const handleUpdateService = (updatedService) => {
    setServices(
      services.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
    setEditModalOpen(false);
    setSelectedService(null);
  };

  // حذف خدمة
  const handleDeleteService = () => {
    setServices(services.filter((s) => s.id !== selectedService.id));
    setDeleteModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="bg-white shadow-sm p-5 rounded-lg">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
        >
          أضف خدمة جديدة +
        </button>

        <div className="mt-6">
          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>

      {/* المودالات */}
      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddService}
      />

      <EditServiceModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        service={selectedService}
        onSubmit={handleUpdateService}
      />

      <DeleteServiceModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteService}
      />
    </div>
  );
};

export default ServicesTab;
