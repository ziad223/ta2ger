import React, { useState } from "react";
import { FiSearch, FiDownload } from "react-icons/fi";
import ReportCard from "./ReportCard";
import ReportModal from "./ReportModal";
import DonutChart from "./DonutChart";

const sampleReports = [
  { id: "r1", title: "كشف حساب عام", desc: "ملخص الحسابات العامة", icon: "FiFileText" },
  { id: "r2", title: "تقرير الموظف", desc: "حضور ومكافآت الموظفين", icon: "FiUser" },
  { id: "r3", title: "المصروفات", desc: "قائمة المصروفات حسب الفئة", icon: "FiDollarSign" },
  { id: "r4", title: "تقرير القاعات", desc: "شغل القاعات والحجوزات", icon: "FiPieChart" },
  { id: "r5", title: "تقرير العميل", desc: "حركات ودفعات العملاء", icon: "FiFileText" },
  { id: "r6", title: "تقرير السندات", desc: "سندات القبض والصرف", icon: "FiFileText" },
];

export default function Reports() {
  const [openReport, setOpenReport] = useState(null);
  const [globalQuery, setGlobalQuery] = useState("");

  const visible = sampleReports.filter(
    (r) => r.title.includes(globalQuery) || r.desc.includes(globalQuery)
  );

  return (
    <div className="p-6 min-h-screen my-10 bg-gray-50">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">التقارير</h1>
          <p className="text-sm text-gray-500">
            لوحة تحكم مركزة لكل تقارير النظام — افتح أي تقرير للاطلاع على التفاصيل.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 border rounded-md px-3 py-2 w-full md:w-72 bg-white">
            <FiSearch />
            <input
              value={globalQuery}
              onChange={(e) => setGlobalQuery(e.target.value)}
              className="outline-none text-sm"
              placeholder="ابحث في أسماء التقارير..."
            />
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-md flex items-center gap-2">
            <FiDownload />
            تصدير الكل
          </button>
        </div>
      </header>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Summary Card */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">ملخص سريع</h3>
              <p className="text-xs text-gray-500">نظرة عامة على أداء التقارير</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">آخر تحديث: الآن</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <DonutChart value={51} />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-md bg-gray-50 text-right">
                <div className="text-xs text-gray-500">التقارير</div>
                <div className="font-semibold text-lg">6</div>
              </div>
              <div className="p-3 rounded-md bg-gray-50 text-right">
                <div className="text-xs text-gray-500">استعلامات اليوم</div>
                <div className="font-semibold text-lg">12</div>
              </div>
              <div className="p-3 rounded-md bg-gray-50 text-right">
                <div className="text-xs text-gray-500">تصدير</div>
                <div className="font-semibold text-lg">إجمالي</div>
              </div>
              <div className="p-3 rounded-md bg-gray-50 text-right">
                <div className="text-xs text-gray-500">نشطة</div>
                <div className="font-semibold text-lg">4</div>
              </div>
            </div>
          </div>
        </div>

        {visible.map((r) => (
          <ReportCard key={r.id} report={r} onOpen={setOpenReport} />
        ))}
      </section>

      {/* Modal */}
      <ReportModal openReport={openReport} onClose={() => setOpenReport(null)} />
    </div>
  );
}
