import React, { useState, useMemo, useEffect } from "react";
import Container from "../../components/shared/Container";
import { FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Table from "../../components/shared/Table";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";
import SwitchToggle from "./SwitchToggle";
import { Link } from "react-router-dom";
import apiServiceCall from "../../utils/apiServiceCall";
import { toast } from "react-toastify";

const Occasions = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🟢 جلب المناسبات من API
  const fetchOccasions = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await apiServiceCall({
        url: "occasions",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.status && Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        toast.error("⚠️ لم يتم استرجاع المناسبات");
      }
    } catch (error) {
      console.error("❌ Error fetching occasions:", error);
      toast.error("حدث خطأ أثناء تحميل المناسبات");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOccasions();
  }, []);

  // 🟡 الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "اسم المناسبة", key: "name" },
    {
      label: "الحالة",
      key: "status",
     render: (row) => (
  <SwitchToggle
    enabled={row.status}
    onChange={() =>
      setEvents((prev) =>
        prev.map((e) =>
          e.id === row.id ? { ...e, status: !e.status } : e
        )
      )
    }
  />
),

    },
   
    { label: "التحكم", key: "actions" },
  ];

  const filteredEvents = useMemo(() => {
    if (!searchTerm.trim()) return events;
    return events.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }, [searchTerm, events]);

  const dataWithActions = filteredEvents.map((event) => ({
    ...event,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedEvent(event);
            setEditModalOpen(true);
          }}
          className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
        >
          <CiEdit size={20} />
        </button>
        <button
          onClick={() => {
            setSelectedEvent(event);
            setDeleteModalOpen(true);
          }}
          className="text-white bg-red-500 w-[30px] h-[30px] rounded flex items-center justify-center"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    ),
  }));

  // ➕ إضافة مناسبة جديدة (محليًا)
  const handleAddEvent = (newEvent) => {
    const id = events.length ? events[events.length - 1].id + 1 : 1;
    setEvents([...events, { ...newEvent, id, status: true }]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e.id !== selectedEvent.id));
    setDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen mt-10">
        <h2 className="text-xl font-bold mb-4">إدارة المناسبات</h2>

        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
            <input
              type="text"
              placeholder="ابحث باسم المناسبة"
              className="outline-none h-[40px] border px-3 rounded-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />

            <div className="flex flex-col md:flex-row items-center gap-2">
              <Link
                to="/halls"
                className="bg-blue-600 hover:bg-blue-500 transition duration-300 px-5 flex items-center justify-center h-[40px] text-white rounded-md w-full md:w-auto text-center"
              >
                القاعات
              </Link>

              <button
                onClick={() => setAddModalOpen(true)}
                className="bg-[#2ba670] hover:bg-[#24945c] transition duration-300 px-5 h-[40px] text-white rounded-md w-full md:w-auto text-center"
              >
                أضف مناسبة +
              </button>
            </div>
          </div>

          {isLoading ? (
           null
          ) : (
            <Table columns={columns} data={dataWithActions} />
          )}
        </div>
      </div>

      {/* 🧩 المودالات */}
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddEvent}
      />
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        eventData={selectedEvent}
        onUpdate={handleUpdateEvent}
      />
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteEvent}
        eventName={selectedEvent?.name}
        eventId = {selectedEvent?.id}
      />
    </Container>
  );
};

export default Occasions;
