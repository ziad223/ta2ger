// src/pages/services/Categories.jsx
import React, { useState, useMemo } from "react";
import Container from "../../../components/shared/Container";
import Table from "../../../components/shared/Table";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "القسم الرئيسي", parent: "-" },
    { id: 2, name: "القسم الفرعي 1", parent: "القسم الرئيسي" },
    { id: 3, name: "القسم الفرعي 2", parent: "القسم الرئيسي" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "الاسم", key: "name" },
    { label: "فرعي من", key: "parent" },
    { label: "التحكم", key: "actions" },
  ];

  // الفلترة
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categories]);

  // إضافة عمود التحكم
  const dataWithActions = filteredCategories.map((cat) => ({
    ...cat,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedCategory(cat);
            setEditModalOpen(true);
          }}
          className="text-white text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => {
            setSelectedCategory(cat);
            setDeleteModalOpen(true);
          }}
          className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    ),
  }));

  // إضافة قسم
  const handleAddCategory = (newCategory) => {
    const id = categories.length
      ? categories[categories.length - 1].id + 1
      : 1;
    setCategories([...categories, { ...newCategory, id }]);
    setAddModalOpen(false);
  };

  // تعديل قسم
  const handleUpdateCategory = (updatedCategory) => {
    setCategories(
      categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
    );
    setEditModalOpen(false);
    setSelectedCategory(null);
  };

  // حذف قسم
  const handleDeleteCategory = () => {
    setCategories(categories.filter((c) => c.id !== selectedCategory.id));
    setDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4">الأقسام</h2>

        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          {/* البحث + زرار الإضافة */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
            {/* حقل البحث */}
            <input
              type="text"
              placeholder="البحث باسم القسم"
              className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-[250px]"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />

            {/* زرار إضافة قسم */}
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
            >
              أضف قسم +
            </button>
          </div>

          {/* الجدول */}
          <div className="mt-6">
            <Table columns={columns} data={dataWithActions} />
          </div>
        </div>
      </div>

      {/* مودالات */}
      {isAddModalOpen && (
        <AddCategoryModal onClose={() => setAddModalOpen(false)} onSubmit={handleAddCategory} />
      )}
      {isEditModalOpen && selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleUpdateCategory}
        />
      )}
      {isDeleteModalOpen && selectedCategory && (
        <DeleteCategoryModal
          category={selectedCategory}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteCategory}
        />
      )}
    </Container>
  );
};

export default Categories;
