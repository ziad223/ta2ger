'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Container from '../../components/shared/Container';
import { FaBuffer, FaCreditCard, FaTrashAlt, FaUsers, FaUserShield } from 'react-icons/fa';
import Table from '../../components/shared/Table';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import DeleteEmployeeModal from './DeleteEmployeeModal';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import apiServiceCall from '../../utils/apiServiceCall';
import { FaEye } from 'react-icons/fa6';
import ViewEmployeeModal from './ViewEmployeeModal';

const Employees = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
const [isViewModalOpen, setViewModalOpen] = useState(false);

  // ✅ pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ columns for table
  const columns = [
    { label: "#", key: "id" },
    { label: "اسم الموظف", key: "name" },
    { label: "البريد الإلكتروني", key: "email" },
    { label: "الدور", key: "role" },
    { label: "القاعات", key: "halls" },
    { label: "التحكم", key: "actions" },
  ];

 const fetchEmployees = async (page = 1, searchKey = '') => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    const response = await apiServiceCall({
      url: `users?page=${page}&name=${searchKey}`, // بدل phone بـ name
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.status) {
      setClients(response.data);
      setLastPage(response.pagination?.last_page || 1);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  const delayDebounce = setTimeout(() => {
    fetchEmployees(currentPage, searchTerm);
  }, 400);

  return () => clearTimeout(delayDebounce);
}, [currentPage, searchTerm]);

  console.log(clients)

  // ✅ Actions column
const dataWithActions = useMemo(
  () =>
    clients.map((client) => ({
      ...client,
      phone: client.phone || '-',
      role: client.role?.name || '-',
      halls: client.halls?.join(', ') || '-',
      actions: (
        <div className="flex gap-2 justify-center">
          {/* 👁️ زر العرض */}
          <button
            onClick={() => {
              setSelectedClient(client);
              setViewModalOpen(true);
            }}
            className="text-white text-xs bg-purple-600 w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
          >
            <FaEye size={16} />
          </button>

          {/* ✏️ زر التعديل */}
          <button
            onClick={() => {
              setSelectedClient(client);
              setEditModalOpen(true);
            }}
            className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
          >
            <CiEdit size={20} />
          </button>

          {/* 🗑️ زر الحذف */}
         <button
  onClick={() => {
    setSelectedClient(client);
    setDeleteModalOpen(true);
  }}
  className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
>
  <FaTrashAlt size={14} />
</button>
        </div>
      ),
    })),
  [clients]
);

const handleDeleteClient = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await apiServiceCall({
      url: `users/${selectedClient.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.status) {
      // تحديث البيانات بعد ثانية
      setTimeout(() => {
        fetchEmployees(currentPage, searchTerm);
      }, 1000);

      // إغلاق المودال بعد 800 مللي ثانية
      setTimeout(() => {
        setDeleteModalOpen(false);
        setSelectedClient(null);
      }, 800);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};



  // ✅ Add employee (local simulation)
  const handleAddClient = (newClient) => {
    setClients((prev) => [...prev, { ...newClient, id: prev.length + 1 }]);
    setAddModalOpen(false);
  };

  // ✅ Update employee (local simulation)
  const handleUpdateClient = (updatedClient) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
    setEditModalOpen(false);
  };


  return (
    <Container>
      <div className="p-4 my-10 min-h-screen">
        {/* ✅ Header */}
        <div className="flex items-center flex-col lg:flex-row justify-between w-full">
          <h2 className="text-xl font-bold">الموظفين</h2>
          <div className="flex items-center gap-2 flex-col lg:flex-row">
            <Link
              to="/settings/employees"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>الموظفين</span>
              <FaUsers />
            </Link>
            <Link
              to="/settings/sections"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>الأقسام</span>
              <FaBuffer />
            </Link>
            <Link
              to="/settings/privacy-policy"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>سياسة الخصوصية</span>
              <FaUserShield />
            </Link>
            <Link
              to="/settings/pay-ways"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>طرق الدفع</span>
              <FaCreditCard />
            </Link>
          </div>
        </div>

        {/* ✅ Search & Add */}
        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
          <input
  type="text"
  placeholder="البحث باسم الموظف"
  className="outline-none opacity-0 h-[40px] border px-3 rounded-lg w-full md:w-[300px]"
  onChange={(e) => setSearchTerm(e.target.value)}
  value={searchTerm}
/>
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
            >
              أضف موظف +
            </button>
          </div>

         

          {/* ✅ Pagination */}
          {lastPage > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-1.5 rounded-md font-medium transition ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#0dcaf0] text-white hover:bg-[#0bb4d8]'
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
                      ? 'bg-[#0dcaf0] text-white border-[#0dcaf0]'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
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
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#0dcaf0] text-white hover:bg-[#0bb4d8]'
                }`}
              >
                التالي
              </button>
            </div>
          )}
        </div>

        {/* ✅ Modals */}
        {isAddModalOpen && (
          <AddEmployeeModal
            onClose={() => setAddModalOpen(false)}
            onSave={handleAddClient}
          />
        )}
      {isEditModalOpen && selectedClient && (
  <EditEmployeeModal
    employee={selectedClient} // بدل client
    onClose={() => setEditModalOpen(false)}
    refetch={fetchEmployees} // لو عايز تعمل refetch بعد التحديث
  />
)}
        {isDeleteModalOpen && selectedClient && (
          <DeleteEmployeeModal
            client={selectedClient}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={handleDeleteClient}
          />
        )}
        {isViewModalOpen && selectedClient && (
  <ViewEmployeeModal
    userId={selectedClient.id}
    onClose={() => setViewModalOpen(false)}
  />
)}
      </div>
    </Container>
  );
};

export default Employees;
