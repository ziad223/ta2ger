'use client';
import { useState, useEffect, useMemo } from "react";
import Container from "../../components/shared/Container";
import Table from "../../components/shared/Table";
import { FaTrashAlt } from "react-icons/fa";
import DeleteContactModal from "./DeleteContactModal";
import apiServiceCall from "../../utils/apiServiceCall";
import { toast } from "react-toastify";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(false);

 const fetchMessages = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");

    const res = await apiServiceCall({
      url: "contact/messages",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }, 
    });

    if (res?.status) {
      setMessages(res.data || []);
    } else {
      toast.error(res?.message || "حدث خطأ أثناء تحميل الرسائل ❌");
    }
  } catch (err) {
    console.error("❌ خطأ أثناء تحميل الرسائل:", err);
    toast.error("حدث خطأ أثناء تحميل الرسائل");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchMessages();
  }, []);

  // ✅ فلترة البيانات
  const filteredMessages = useMemo(() => {
    if (!searchTerm.trim()) return messages;
    return messages.filter(
      (msg) =>
        msg.name?.includes(searchTerm.trim()) ||
        msg.phone?.includes(searchTerm.trim()) ||
        msg.message?.includes(searchTerm.trim())
    );
  }, [searchTerm, messages]);

  // ✅ حذف الرسالة
  const handleDeleteMessage = async () => {
    setMessages(messages.filter((m) => m.id !== selectedMessage.id));
    setDeleteModalOpen(false);
    setSelectedMessage(null);
  };

  // ✅ الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "الاسم", key: "name" },
    { label: "رقم الجوال", key: "phone" },
    { label: "الرسالة", key: "message" },
    { label: "التحكم", key: "actions" },
  ];

  // ✅ تجهيز البيانات مع أزرار التحكم
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
          <input
            type="text"
            placeholder="ابحث بالاسم أو رقم الجوال أو الرسالة..."
            className="border p-2 rounded w-full lg:w-[30%] mb-4 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* ✅ الجدول */}
          <div className="mt-6">
            {loading ? (
              <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>
            ) : (
              <Table columns={columns} data={dataWithActions} />
            )}
          </div>
        </div>

      {isDeleteModalOpen && selectedMessage && (
  <DeleteContactModal
    message={selectedMessage}
    onClose={() => setDeleteModalOpen(false)}
    onDeleteSuccess={(deletedId) =>
      setMessages((prev) => prev.filter((msg) => msg.id !== deletedId))
    }
  />
)}
      </div>
    </Container>
  );
};

export default ContactMessages;
