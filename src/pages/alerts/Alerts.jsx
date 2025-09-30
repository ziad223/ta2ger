import React, { useState, useMemo } from "react";
import Container from "../../components/shared/Container";
import Table from "../../components/shared/Table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditAlertModal from "./EditAlertModal";
import DeleteAlertModal from "./DeleteAlertModal";

const Alerts = () => {
  const [searchClient, setSearchClient] = useState("");
  const [searchReservationId, setSearchReservationId] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      client: "محمد علي",
      hall: "قاعة الأندلس",
      reservationId: "R-1001",
      date: "2025-09-20",
      deposit: "5000",
      dueAmount: "2000",
      alert: "موعد الدفع بعد يومين",
      whatsapp: "تم الإرسال",
    },
    {
      id: 2,
      client: "سارة عبد الله",
      hall: "قاعة الفيصل",
      reservationId: "R-1002",
      date: "2025-09-25",
      deposit: "3000",
      dueAmount: "4000",
      alert: "موعد الدفع غداً",
      whatsapp: "لم يتم الإرسال",
    },
  ]);

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const columns = [
    { label: "#", key: "id" },
    { label: "العميل", key: "client" },
    { label: "القاعة", key: "hall" },
    { label: "رقم الحجز", key: "reservationId" },
    { label: "تاريخ الحجز", key: "date" },
    { label: "المقدم", key: "deposit" },
    { label: "المبلغ المتأخر", key: "dueAmount" },
    { label: "التنبيه", key: "alert" },
    { label: "واتساب", key: "whatsapp" },
    { label: "التحكم", key: "actions" },
  ];

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      const matchesClient =
        searchClient === "" ||
        a.client.toLowerCase().includes(searchClient.toLowerCase());

      const matchesReservationId =
        searchReservationId === "" ||
        a.reservationId.toLowerCase().includes(searchReservationId.toLowerCase());

      const matchesFrom = dateFrom ? new Date(a.date) >= new Date(dateFrom) : true;
      const matchesTo = dateTo ? new Date(a.date) <= new Date(dateTo) : true;

      return matchesClient && matchesReservationId && matchesFrom && matchesTo;
    });
  }, [searchClient, searchReservationId, dateFrom, dateTo, alerts]);

  const dataWithActions = filteredAlerts.map((a) => ({
    ...a,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedAlert(a);
            setEditModalOpen(true);
          }}
          className="bg-[#0dcaf0] text-white rounded-sm w-[30px] h-[30px] flex items-center justify-center"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={() => {
            setSelectedAlert(a);
            setDeleteModalOpen(true);
          }}
          className="bg-red-500 text-white rounded-sm w-[30px] h-[30px] flex items-center justify-center"
        >
          <FaTrashAlt size={16} />
        </button>
      </div>
    ),
  }));

  const handleUpdateAlert = (updated) => {
    setAlerts((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleDeleteAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    setSelectedAlert(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen my-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-bold mb-4">التنبيهات</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2ba670] px-3 h-[35px] text-white rounded-md"
          >
            أضف تنبيه +
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          {/* فلاتر البحث كلها في صف واحد */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 items-center">
            <input
              type="text"
              value={searchClient}
              onChange={(e) => setSearchClient(e.target.value)}
              placeholder="بحث بالعميل"
              className="border h-[40px] px-3 rounded-lg text-sm w-full outline-none"
            />

            <input
              type="text"
              value={searchReservationId}
              onChange={(e) => setSearchReservationId(e.target.value)}
              placeholder="بحث برقم الحجز"
              className="border h-[40px] px-3 rounded-lg text-sm w-full outline-none"
            />

            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border h-[40px] px-3 rounded-lg text-sm w-full outline-none"
              placeholder="من"
            />

            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border h-[40px] px-3 rounded-lg text-sm w-full outline-none"
              placeholder="إلى"
            />
          </div>

          {/* تنبيه */}
          <div className="mb-6 bg-[#cff4fc] text-lg h-[60px] flex items-center px-5 text-[#0589c6] rounded-lg font-semibold text-sm">
          يظهر هنا المتاخرين عن السداد الذي بقي لهم يومين عن موعد الحجز
          </div>

          {/* جدول التنبيهات */}
          <Table columns={columns} data={dataWithActions} />
        </div>

        {/* مودال التعديل */}
        <EditAlertModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          alert={selectedAlert}
          onSave={handleUpdateAlert}
        />

        {/* مودال الحذف */}
        <DeleteAlertModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          alert={selectedAlert}
          onDelete={handleDeleteAlert}
        />
      </div>
    </Container>
  );
};

export default Alerts;
