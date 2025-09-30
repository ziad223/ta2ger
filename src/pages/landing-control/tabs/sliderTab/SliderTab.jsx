import React, { useState, useMemo } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Table from "../../../../components/shared/Table";
import AddSliderModal from "./AddSliderModal";
import EditSliderModal from "./EditSliderModal";
import DeleteSliderModal from "./DeleteSliderModal";

const SliderTab = () => {
  const [sliders, setSliders] = useState([
    {
      id: 1,
      title: "عنوان السلايدر الأول",
      subtitle: "هذا النص هو العنوان الفرعي",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "عنوان السلايدر الثاني",
      subtitle: "نص فرعي للسلايدر الثاني",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "العنوان", key: "title" },
    { label: "العنوان الفرعي", key: "subtitle" },
    {
      label: "الصورة",
      key: "image",
      render: (row) => (
        <img
          src={row.image}
          alt={row.title}
          className="w-16 h-16 object-cover rounded mx-auto"
        />
      ),
    },
    { label: "الإجراءات", key: "actions" },
  ];

  // فلترة حسب العنوان
  const filteredSliders = useMemo(() => {
    if (!searchTerm.trim()) return sliders;
    return sliders.filter((s) => s.title.includes(searchTerm.trim()));
  }, [searchTerm, sliders]);

  // إضافة أزرار التحكم
  const dataWithActions = filteredSliders.map((slider) => ({
    ...slider,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedSlider(slider);
            setEditModalOpen(true);
          }}
          className="text-white text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => {
            setSelectedSlider(slider);
            setDeleteModalOpen(true);
          }}
          className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    ),
  }));

  // إضافة سلايدر
  const handleAddSlider = (newSlider) => {
    const id = sliders.length ? sliders[sliders.length - 1].id + 1 : 1;
    setSliders([...sliders, { ...newSlider, id }]);
    setAddModalOpen(false);
  };

  // تعديل سلايدر
  const handleUpdateSlider = (updatedSlider) => {
    setSliders(
      sliders.map((s) => (s.id === updatedSlider.id ? updatedSlider : s))
    );
    setEditModalOpen(false);
    setSelectedSlider(null);
  };

  // حذف سلايدر
  const handleDeleteSlider = () => {
    setSliders(sliders.filter((s) => s.id !== selectedSlider.id));
    setDeleteModalOpen(false);
    setSelectedSlider(null);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow-sm  rounded-lg">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
        >
          أضف سلايدر جديد +
        </button>

        <div className="mt-6">
          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>

      {/* مودال الإضافة */}
      {isAddModalOpen && (
        <AddSliderModal
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddSlider}
        />
      )}

      {isEditModalOpen && selectedSlider && (
        <EditSliderModal
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleUpdateSlider}
          slider={selectedSlider}
        />
      )}

      {/* مودال الحذف */}
      {isDeleteModalOpen && selectedSlider && (
        <DeleteSliderModal
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteSlider}
          slider={selectedSlider}
        />
      )}
    </div>
  );
};

export default SliderTab;
