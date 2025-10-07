"use client";

import React, { useState, useEffect, useMemo } from "react";
import Container from "../../components/shared/Container";
import { FaBuffer, FaUsers, FaUserShield, FaCreditCard, FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import CreateSectionModel from "./CreateSectionModel";
import EditSectionModel from "./EditSectionModel";
import { Link } from "react-router-dom";
import apiServiceCall from "../../utils/apiServiceCall";

const Sections = () => {
  const [sections, setSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  // جلب البيانات من API
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await apiServiceCall({
          url: "categories",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedSections = response.data.map((item) => ({
          id: item.id,
          name: item.name,
        }));

        setSections(formattedSections);
      } catch (error) {
        console.error("خطأ في جلب الأقسام:", error);
      }
    };

    fetchSections();
  }, []);

  // تصفية الأقسام حسب الاسم
  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return sections;
    return sections.filter((section) => section.name.includes(searchTerm.trim()));
  }, [searchTerm, sections]);

  // إضافة قسم جديد
  const handleAddSection = (newSection) => {
    const id = sections.length ? sections[sections.length - 1].id + 1 : 1;
    setSections([...sections, { ...newSection, id }]);
    setCreateModalOpen(false);
  };

  // تعديل بيانات القسم
  const handleUpdateSection = (updatedSection) => {
    setSections(sections.map((s) => (s.id === updatedSection.id ? updatedSection : s)));
    setEditModalOpen(false);
    setSelectedSection(null);
  };

  // حذف القسم
  const handleDeleteSection = () => {
    setSections(sections.filter((s) => s.id !== selectedSection.id));
    setDeleteModalOpen(false);
    setSelectedSection(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen">
        <div className="flex items-center flex-col lg:flex-row justify-between w-full my-10">
          <h2 className="text-xl font-bold">الأقسام</h2>
          <div className="flex items-center gap-2 flex-col lg:flex-row">
            <Link to="/settings/employees" className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white">
              <span>الموظفين</span>
              <FaUsers />
            </Link>
            <Link to="/settings/sections" className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white">
              <span>الأقسام</span>
              <FaBuffer />
            </Link>
            <Link to="/settings/privacy-policy" className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white">
              <span>سياسة الخصوصية</span>
              <FaUserShield />
            </Link>
            <Link to="/settings/pay-ways" className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white">
              <span>طرق الدفع</span>
              <FaCreditCard />
            </Link>
          </div>
        </div>

        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
            <input
              type="text"
              placeholder="البحث باسم القسم"
              className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-[300px]"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button
              onClick={() => setCreateModalOpen(true)}
              className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
            >
              أضف قسم +
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSections.map((section) => (
              <div key={section.id} className="border rounded-lg p-4 flex flex-col items-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow">
<div className="text-lg font-medium">{section.name}</div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setSelectedSection(section);
                      setEditModalOpen(true);
                    }}
                    className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
                  >
                    <CiEdit size={24} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSection(section);
                      setDeleteModalOpen(true);
                    }}
                    className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isCreateModalOpen && <CreateSectionModel onClose={() => setCreateModalOpen(false)} onSave={handleAddSection} />}
        {isEditModalOpen && selectedSection && <EditSectionModel section={selectedSection} onClose={() => setEditModalOpen(false)} onSave={handleUpdateSection} />}
        {isDeleteModalOpen && selectedSection && <DeleteEmployeeModal client={selectedSection} onClose={() => setDeleteModalOpen(false)} onDelete={handleDeleteSection} />}
      </div>
    </Container>
  );
};

export default Sections;
