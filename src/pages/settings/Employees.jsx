import React, { useState, useMemo } from 'react';
import Container from '../../components/shared/Container';
import { FaBuffer, FaCreditCard, FaEdit, FaTrashAlt, FaUsers, FaUserShield } from 'react-icons/fa';
import Table from '../../components/shared/Table';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import DeleteEmployeeModal from './DeleteEmployeeModal';
import { Link } from 'react-router-dom';

const Employees = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "محمد علي",
      phone: "0551234567",
      email: "mohamed@example.com",
      group: "مدير",
      halls: "قاعة الأندلس",
    },
    {
      id: 2,
      name: "أحمد حسن",
      phone: "0567890123",
      email: "ahmed@example.com",
      group: "مشرف",
      halls: "قاعة الفيصل",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedClient, setSelectedClient] = useState(null);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "اسم الموظف", key: "name" },
    { label: "الجوال", key: "phone" },
    { label: "البريد الإلكتروني", key: "email" },
    { label: "المجموعة", key: "group" },
    { label: "القاعات", key: "halls" },
    { label: "التحكم", key: "actions" },
  ];

  // تصفية حسب رقم الجوال
  const filteredClients = useMemo(() => {
    if (!searchTerm.trim()) return clients;
    return clients.filter(client =>
      client.phone.includes(searchTerm.trim())
    );
  }, [searchTerm, clients]);

  // دمج الأزرار داخل البيانات
  const dataWithActions = filteredClients.map(client => ({
    ...client,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedClient(client);
            setEditModalOpen(true);
          }}
          className="text-white text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaEdit size={16} />
        </button>
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
  }));

  // إضافة موظف جديد
  const handleAddClient = (newClient) => {
    const id = clients.length ? clients[clients.length - 1].id + 1 : 1;
    setClients([...clients, { ...newClient, id }]);
    setAddModalOpen(false);
  };

  // تعديل بيانات الموظف
  const handleUpdateClient = (updatedClient) => {
    setClients(clients.map(c => (c.id === updatedClient.id ? updatedClient : c)));
    setEditModalOpen(false);
    setSelectedClient(null);
  };

  // حذف الموظف
  const handleDeleteClient = () => {
    setClients(clients.filter(c => c.id !== selectedClient.id));
    setDeleteModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <Container>
      <div className="p-4 my-10 min-h-screen">
                <div className='flex items-center flex-col lg:flex-row  justify-between w-full '>
        <h2 className="text-xl font-bold">الموظفين</h2>
         <div className='flex items-center gap-2 flex-col lg:flex-row'>
            <Link to='/settings/employees' className='flex items-center  gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>الموظفين</span>
                <FaUsers/>
            </Link>
             <Link to = '/settings/sections' className='flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>الأقسام</span>
                <FaBuffer/>
            </Link>
            <Link to='/settings/privacy-policy' className='flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>سياسة الخصوصية</span>
                <FaUserShield/>
            </Link>
            <Link to='/settings/pay-ways' className='flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>طرق الدفع</span>
                <FaCreditCard/>
            </Link>
          </div>
          </div>
        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
            <input
              type="text"
              placeholder="البحث برقم الجوال"
              className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-[300px]"
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

          <div className="mt-6">
            <Table columns={columns} data={dataWithActions} />
          </div>
        </div>

        {/* ✅ مودال الإضافة */}
        {isAddModalOpen && (
          <AddEmployeeModal
            onClose={() => setAddModalOpen(false)}
            onSave={handleAddClient}
          />
        )}

        {/* ✅ مودال التعديل */}
        {isEditModalOpen && selectedClient && (
          <EditEmployeeModal
            client={selectedClient}
            onClose={() => setEditModalOpen(false)}
            onSave={handleUpdateClient}
          />
        )}

        {/* ✅ مودال الحذف */}
        {isDeleteModalOpen && selectedClient && (
          <DeleteEmployeeModal
            client={selectedClient}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={handleDeleteClient}
          />
        )}
      </div>
    </Container>
  );
};

export default Employees;
