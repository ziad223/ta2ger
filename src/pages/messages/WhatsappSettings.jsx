import React from "react";
import Container from "../../components/shared/Container";

const WhatsappSettings = () => {
  const halls = [
    { id: 1, name: "قاعة زفاف" },
    { id: 2, name: "قاعة المعالي الكبرى" },
  ];

  return (
    <Container>
      <div className="my-10">
        <h2 className="font-bold text-center text-lg mb-6">
          إعدادات الواتس اب للقاعات
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {halls.map((hall) => (
            <div
              key={hall.id}
              className="border rounded-lg shadow bg-white overflow-hidden"
            >
              {/* الهيدر */}
              <div className="bg-yellow-400 text-black font-bold px-4 py-2 flex items-center gap-2">
                <span>📅</span>
                <span>{hall.name}</span>
              </div>

              {/* البودي */}
              <div className="p-4 space-y-4">
                {/* التوكن */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    التوكن (access_token)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="التوكن"
                      className="flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
                    />
                    <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm">
                      الحصول على معرف العميل (instance_id)
                    </button>
                  </div>
                </div>

                {/* معرف العميل */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    معرف العميل (instance_id)
                  </label>
                  <input
                    type="text"
                    placeholder="معرف العميل"
                    className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
                  />
                </div>

                {/* رقم الهاتف */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    رقم الهاتف
                  </label>
                  <input
                    type="text"
                    placeholder="رقم الهاتف"
                    className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
                  />
                </div>

                {/* الأزرار */}
                <div className="space-y-2">
                  <button className="w-full bg-green-600 text-white py-2 rounded text-sm">
                    📑 الحصول على كود QR
                  </button>
                  <button className="w-full bg-blue-500 text-white py-2 rounded text-sm">
                    🔑 إنشاء كود الاقتران
                  </button>
                  <button className="w-full bg-blue-500 text-white py-2 rounded text-sm">
                    🔄 إعادة الاتصال
                  </button>
                </div>

                {/* الحالة */}
                <p className="text-sm text-yellow-600 font-semibold flex items-center gap-1">
                  ⚠️ غير متصل
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default WhatsappSettings;
