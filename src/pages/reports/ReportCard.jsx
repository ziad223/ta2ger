import React from "react";
import * as Icons from "react-icons/fi";
import { FiFileText } from "react-icons/fi";

export default function ReportCard({ report, onOpen }) {
  const Icon = Icons[report.icon] || FiFileText;

  return (
    <button
      onClick={() => onOpen(report)}
      className="group bg-white hover:shadow-lg transition-shadow rounded-2xl border p-4 flex items-center gap-4 justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center ring-1 ring-teal-100">
          <Icon size={28} />
        </div>
        <div className="text-right">
          <div className="font-semibold text-gray-800">{report.title}</div>
          <div className="text-xs text-gray-500">{report.desc}</div>
        </div>
      </div>
    </button>
  );
}
