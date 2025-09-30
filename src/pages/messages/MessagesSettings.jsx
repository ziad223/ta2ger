import React, { useState } from "react";
import Container from "../../components/shared/Container";

const MessagesSettings = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: "رسالة ترحيب بالعميل الجديد",
      enabled: true,
      content: `👋 أهلاً عميلنا العزيز {userName} 🌹\nتم تسجيلكم لدينا بنجاح...`,
    },
    {
      id: 2,
      title: "رسالة تأكيد الحجز",
      enabled: true,
      content: `👋 أهلاً عميلنا {userName} 🌹\nتم عمل حجز جديد لكم برقم: {appointmentNumber}`,
    },
    {
      id: 3,
      title: "رسالة موعد زيارة القاعة",
      enabled: false,
      content: `👋 أهلاً عميلنا {userName} 🌹\nرقم الحجز: {appointmentNumber}\nموعد الزيارة هو: {startDate}`,
    },
  ]);

  const handleToggle = (id) => {
    setTemplates(
      templates.map((t) =>
        t.id === id ? { ...t, enabled: !t.enabled } : t
      )
    );
  };

  const handleChange = (id, value) => {
    setTemplates(
      templates.map((t) =>
        t.id === id ? { ...t, content: value } : t
      )
    );
  };

  const handleSave = (id) => {
    const template = templates.find((t) => t.id === id);
    console.log("تم الحفظ:", template);
    // هنا تبعت للسيرفر
  };

  return (
    <Container>
      <div className="my-10 min-h-screen">
        {/* الصندوق الأزرق للتوضيح */}
        <div className="bg-white rounded-lg p-5">
          <div className="bg-[#cff4fc] rounded-lg p-5">
            <h2 className="font-bold text-base">
              قم بأستخدام التعابير والمتغيرات الاتية لطباعة المحتوى الخاص بها
            </h2>
            <ul className="mt-4 space-y-1">
              <li>userName : إسم العميل </li>
              <li>appointmentNumber : رقم الحجز</li>
              <li>startDate : تاريخ بداية الحجز</li>
              <li>endDate : تاريخ نهاية الحجز</li>
              <li>hall : القاعة</li>
              <li>remainingAmount : المبلغ المتبقي</li>
            </ul>
          </div>
        </div>

        {/* الكروت */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {templates.map((t) => (
            <div
              key={t.id}
              className="bg-white border rounded-lg shadow p-4 flex flex-col"
            >
              {/* العنوان + التفعيل */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base">{t.title}</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={t.enabled}
                    onChange={() => handleToggle(t.id)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">تفعيل</span>
                </label>
              </div>

              {/* محرر الرسالة */}
              <textarea
                value={t.content}
                onChange={(e) => handleChange(t.id, e.target.value)}
                className="flex-1 border rounded-lg p-3 min-h-[150px] outline-none focus:ring focus:ring-blue-200 text-sm leading-relaxed"
              />

              {/* زر الحفظ */}
              <button
                onClick={() => handleSave(t.id)}
                className="mt-3 self-end bg-blue-600 text-white px-4 py-2 rounded"
              >
                حفظ
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MessagesSettings;
