import React, { useState, useMemo } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Table from "../../../../components/shared/Table";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import DeleteEventModal from "./DeleteEventModal";

const EventsTab = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "حفل تخرج",
      content: "احتفال بتخرج دفعة جديدة من الطلاب.",
      image: "https://via.placeholder.com/80",
      createdAt: "2025-09-20",
    },
    {
      id: 2,
      title: "مؤتمر طبي",
      content: "مؤتمر عن آخر الأبحاث الطبية.",
      image: "https://via.placeholder.com/80",
      createdAt: "2025-09-15",
    },
  ]);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "العنوان", key: "title" },
    { label: "المحتوى", key: "content" },
    {
      label: "الصورة",
      key: "image",
      render: (row) => (
        <img
          src={row.image}
          alt={row.title}
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    { label: "تاريخ الإنشاء", key: "createdAt" },
    { label: "الإجراءات", key: "actions" },
  ];

  // دمج الإجراءات
  const dataWithActions = useMemo(
    () =>
      events.map((event) => ({
        ...event,
        actions: (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setSelectedEvent(event);
                setEditModalOpen(true);
              }}
              className="text-white text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={() => {
                setSelectedEvent(event);
                setDeleteModalOpen(true);
              }}
              className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
            >
              <FaTrashAlt size={14} />
            </button>
          </div>
        ),
      })),
    [events]
  );

  // إضافة
  const handleAddEvent = (newEvent) => {
    const id = events.length ? events[events.length - 1].id + 1 : 1;
    setEvents([...events, { ...newEvent, id, createdAt: new Date().toISOString().split("T")[0] }]);
    setAddModalOpen(false);
  };

  // تعديل
  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
    setEditModalOpen(false);
    setSelectedEvent(null);
  };

  // حذف
  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e.id !== selectedEvent.id));
    setDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="bg-white shadow-sm p-5 rounded-lg">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
        >
          أضف مناسبة جديدة +
        </button>

        <div className="mt-6">
          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>

      {/* المودالات */}
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddEvent}
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        event={selectedEvent}
        onSubmit={handleUpdateEvent}
      />

      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteEvent}
      />
    </div>
  );
};

export default EventsTab;
