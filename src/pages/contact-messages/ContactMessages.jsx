import { useState, useMemo } from "react";
import Container from "../../components/shared/Container";
import Table from "../../components/shared/Table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import DeleteContactModal from "./DeleteContactModal";

const ContactMessages = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: "محمد علي", phone: "0551234567", message: "أريد حجز قاعة الأسبوع القادم" },
    { id: 2, name: "أحمد حسن", phone: "0567890123", message: "هل القاعة متاحة يوم الجمعة؟" },
    { id: 3, name: "سارة محمود", phone: "0579876543", message: "أرغب بمعرفة الأسعار والعروض" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState(null);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "الاسم", key: "name" },
    { label: "رقم الجوال", key: "phone" },
    { label: "الرسالة", key: "message" },
    { label: "التحكم", key: "actions" },
  ];

  // فلترة
  const filteredMessages = useMemo(() => {
    if (!searchTerm.trim()) return messages;
    return messages.filter(
      (msg) =>
        msg.name.includes(searchTerm.trim()) ||
        msg.phone.includes(searchTerm.trim()) ||
        msg.message.includes(searchTerm.trim())
    );
  }, [searchTerm, messages]);

  // إضافة
  const handleAddMessage = (newMessage) => {
    const id = messages.length ? messages[messages.length - 1].id + 1 : 1;
    setMessages([...messages, { ...newMessage, id }]);
  };

  // تعديل
  const handleUpdateMessage = (updatedMessage) => {
    setMessages(messages.map((m) => (m.id === updatedMessage.id ? updatedMessage : m)));
  };

  // حذف
  const handleDeleteMessage = () => {
    setMessages(messages.filter((m) => m.id !== selectedMessage.id));
    setDeleteModalOpen(false);
    setSelectedMessage(null);
  };

  // دمج البيانات مع أزرار التحكم
  const dataWithActions = filteredMessages.map((msg) => ({
    ...msg,
    actions: (
      <div className="flex gap-2 justify-center">
       
        <button
          onClick={() => {
            setSelectedMessage(msg);
            setDeleteModalOpen(true);
          }}
          className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    ),
  }));

  return (
    <Container>
      <div className="p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4">تواصل معنا</h2>

        <div className="bg-white shadow-sm p-5 rounded-lg">
        

          <div className="mt-6">
            <Table columns={columns} data={dataWithActions} />
          </div>
        </div>

        {isDeleteModalOpen && selectedMessage && (
          <DeleteContactModal
            message={selectedMessage}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={handleDeleteMessage}
          />
        )}
      </div>
    </Container>
  );
};

export default ContactMessages;
