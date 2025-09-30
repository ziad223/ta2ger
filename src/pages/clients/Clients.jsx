import React, { useState, useMemo } from 'react';
import Container from '../../components/shared/Container';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Table from '../../components/shared/Table';

import AddClientModal from './AddClientModal';
import EditClientModal from './EditClientModal';
import DeleteClientModal from './DeleteClientModal';

const Clients = () => {
  const [clients, setClients] = useState([
    { id: 1, name: "محمد علي", nationalId: "1010101010", phone: "0551234567", altPhone: "0557654321", createdAt: "2025-09-19", hall: "قاعة الأندلس", bookings: 5 },
    { id: 2, name: "أحمد حسن", nationalId: "2020202020", phone: "0567890123", altPhone: "0563210987", createdAt: "2025-09-18", hall: "قاعة الفيصل", bookings: 2 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const columns = [
    { label: "#", key: "id" },
    { label: "الاسم", key: "name" },
    { label: "رقم هوية العميل", key: "nationalId" },
    { label: "الجوال", key: "phone" },
    { label: "رقم جوال اخر", key: "altPhone" },
    { label: "تاريخ الاضافه", key: "createdAt" },
    { label: "القاعة", key: "hall" },
    { label: "الحجوزات", key: "bookings" },
    { label: "التحكم", key: "actions" },
  ];

  const filteredClients = useMemo(() => {
    if (!searchTerm.trim()) return clients;
    return clients.filter(client =>
      client.phone.includes(searchTerm.trim())
    );
  }, [searchTerm, clients]);

  const dataWithActions = filteredClients.map(client => ({
    ...client,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedClient(client);
            setEditModalOpen(true);
          }}
          className="text-white hover:underline text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={() => {
            setSelectedClient(client);
            setDeleteModalOpen(true);
          }}
          className="text-white hover:underline text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaTrashAlt size={17} />
        </button>
      </div>
    ),
  }));

  const handleAddClient = (newClient) => {
    const id = clients.length ? clients[clients.length - 1].id + 1 : 1;
    setClients([...clients, { ...newClient, id }]);
  };

  const handleUpdateClient = (updatedClient) => {
    setClients(clients.map(c => (c.id === updatedClient.id ? updatedClient : c)));
  };

  const handleDeleteClient = () => {
    setClients(clients.filter(c => c.id !== selectedClient.id));
    setDeleteModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen my-10">
        <h2 className="text-xl font-bold mb-4">العملاء</h2>

        <div className="bg-white mt-5 shadow-lg p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
            <input
              type="text"
              placeholder="البحث برقم الجوال"
              className="outline-none h-[40px] border px-3 rounded-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#2ba670] px-3 h-[35px] text-white rounded-md w-full md:w-auto"
            >
              أضف عميل +
            </button>
          </div>

          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>

      {/* مودالات */}
      <AddClientModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddClient} />
      <EditClientModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} client={selectedClient} onUpdate={handleUpdateClient} />
      <DeleteClientModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} onDelete={handleDeleteClient} client={selectedClient} />
    </Container>
  );
};

export default Clients;
