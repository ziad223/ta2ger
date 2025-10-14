'use client';
import React, { useState, useEffect, useMemo } from "react";
import Container from "../../components/shared/Container";
import { FaPrint, FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Table from "../../components/shared/Table";
import AddClientModal from "./AddClientModal";
import EditClientModal from "./EditClientModal";
import DeleteClientModal from "./DeleteClientModal";
import apiServiceCall from "../../utils/apiServiceCall";
import { toast } from "react-toastify";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ جلب البيانات من API
  const fetchClients = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await apiServiceCall({
        url: "clients",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🛰️ Response:", res);

      if (res?.status) {
        const fetchedClients =
          res.data?.map((client) => ({
            id: client.id,
            name: client.name,
            nationalId: client.id_number,
            phone: client.phone,
            altPhone: client.alt_phone,
            createdAt: client.creator?.name || "—",
            hall: client.hall?.name || "—",
            bookings: client.tax_no || "—",
          })) || [];

        setClients(fetchedClients);
      } else {
        toast.error(res?.message || "حدث خطأ أثناء تحميل العملاء ❌");
      }
    } catch (err) {
      console.error("❌ خطأ أثناء تحميل العملاء:", err);
      toast.error("حدث خطأ أثناء تحميل العملاء");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // ✅ فلترة البحث
  const filteredClients = useMemo(() => {
    if (!searchTerm.trim()) return clients;
    return clients.filter((client) =>
      client.phone.includes(searchTerm.trim())
    );
  }, [searchTerm, clients]);

  const columns = [
    { label: "#", key: "id" },
    { label: "الاسم", key: "name" },
    { label: "الجوال", key: "phone" },
    { label: "رقم جوال اخر", key: "altPhone" },
    { label: "القاعة", key: "hall" },
    { label: "رقم ضريبي", key: "bookings" },
    { label: "التحكم", key: "actions" },
  ];

  // ✅ تجهيز البيانات مع أزرار التحكم
  const dataWithActions = filteredClients.map((client) => ({
    ...client,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedClient(client);
            setEditModalOpen(true);
          }}
          className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
        >
          <CiEdit size={22} />
        </button>

        <button
          onClick={() => {
            setSelectedClient(client);
            setDeleteModalOpen(true);
          }}
          className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center hover:bg-red-600 transition"
        >
          <FaTrashAlt size={15} />
        </button>
      </div>
    ),
  }));

  // ✅ الحذف (مؤقت محليًا)
  const handleDeleteClient = () => {
    setClients((prev) => prev.filter((c) => c.id !== selectedClient.id));
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

            <div className="flex gap-3 items-center">
              <div
                onClick={() => window.print()}
                className="bg-yellow-400 w-[40px] h-[40px] rounded-md text-white flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition"
              >
                <FaPrint size={20} />
              </div>

              <div className="bg-[#0dcaf0] flex items-center justify-center md:px-3 px-1 h-[35px] text-white rounded-md w-full md:w-auto">
                عدد العملاء <span>: {clients.length}</span>
              </div>

              <button
                onClick={() => setAddModalOpen(true)}
                className="bg-[#2ba670] md:px-3 px-1 h-[35px] text-white rounded-md w-full md:w-auto"
              >
                أضف عميل +
              </button>
            </div>
          </div>

         
        </div>
      </div>

      {/* ✅ مودالات */}
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        client={selectedClient}
      />
      <DeleteClientModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteClient}
        client={selectedClient}
      />
    </Container>
  );
};

export default Clients;
