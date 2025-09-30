import React from 'react';
import Container from '../../components/shared/Container';
import { FaChevronRight, FaFileExcel } from 'react-icons/fa';
import { FaRegFilePdf } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AccountingTree = () => {
  // الداتا بتاعة الشجرة
  const treeData = [
    {
      name: "1 - الأصول",
      children: [
        {
          name: "1001 - الأصول المتداولة",
          children: [
            { name: "1001001 - النقدية" },
            { name: "1001002 - حسابات بنكية" },
            { name: "1001003 - أوراق قبض" },
          ],
        },
      ],
    },
    {
      name: "2 - الخصوم",
      children: [{ name: "2001 - الخصوم المتداولة" }],
    },
    {
      name: "3 - حقوق الملكية",
      children: [{ name: "3001 - حقوق الملكية" }],
    },
    {
      name: "4 - الإيرادات",
      children: [{ name: "4001 - الإيرادات" }],
    },
    {
      name: "5 - المصروفات",
      children: [{ name: "5001 - المصروفات" }],
    },
  ];

  // دالة تجهيز بيانات مسطحة
  const flattenTree = (nodes, parent = "") => {
    let result = [];
    nodes.forEach((node) => {
      result.push({ حساب: node.name, تابع: parent || "-" });
      if (node.children) {
        result = result.concat(flattenTree(node.children, node.name));
      }
    });
    return result;
  };

  // تصدير PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "bold");
    doc.text("شجرة الحسابات", 20, 20);

    const flatData = flattenTree(treeData);
    let y = 30;
    flatData.forEach((item) => {
      doc.text(`${item.حساب} (${item.تابع})`, 20, y);
      y += 10;
    });

    doc.save("شجرة-الحسابات.pdf");
  };

  // تصدير Excel
  const exportExcel = () => {
    const flatData = flattenTree(treeData);
    const ws = XLSX.utils.json_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "شجرة الحسابات");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "شجرة-الحسابات.xlsx");
  };

  return (
    <div className='min-h-screen'>
      <Container>
        <div className='shadow-xl rounded-lg  p-5  my-20'>
          {/* الهيدر */}
          <div className="bg-white shadow-lg rounded-lg p-5 flex items-center w-full justify-between">
            <div className='flex gap-4 items-center'>
              <Link to='/accounting' className='bg-[#09adce] text-white text-xl p-2 rounded-lg'>
                <FaChevronRight />
              </Link>
              <h2 className='text-xl'>شجرة الحسابات</h2>
            </div>
            <div className='flex gap-4 items-center'>
              <button className='bg-[#09adce] text-white font-bold text-base py-2 px-5 rounded-lg'>
                الشجرة المحاسبية
              </button>
              <button
                onClick={exportPDF}
                className='bg-[#09adce] text-white font-bold text-base py-2 px-5 rounded-lg flex items-center justify-center gap-1'
              >
                <FaRegFilePdf />
                تصدير pdf
              </button>
              <button
                onClick={exportExcel}
                className='bg-[#09adce] text-white font-bold text-base py-2 px-5 rounded-lg flex items-center justify-center gap-1'
              >
                <FaFileExcel />
                تصدير اكسل
              </button>
            </div>
          </div>

          {/* البحث */}
          <div className="bg-white shadow-lg rounded-lg p-5 flex items-center w-full justify-between mt-10">
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="ابحث..."
                className="w-full border border-gray-300 rounded-tr-lg rounded-br-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="bg-transparent border border-gray-700 text-black px-4 py-2 rounded-tl-lg rounded-bl-lg hover:bg-blue-600 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* الأكوردين */}
          <div className="bg-white shadow-lg rounded-lg p-5 mt-10">
            {treeData.map((node, idx) => (
              <details key={idx} className="border-b py-3">
                <summary className="cursor-pointer text-lg font-semibold">
                  {node.name}
                </summary>
                {node.children && (
                  <div className="ml-6 mt-2 space-y-2">
                    {node.children.map((child, i) => (
                      <details key={i}>
                        <summary className="cursor-pointer">{child.name}</summary>
                        {child.children && (
                          <ul className="ml-6 mt-1 space-y-1 text-gray-700">
                            {child.children.map((sub, j) => (
                              <li key={j}>{sub.name}</li>
                            ))}
                          </ul>
                        )}
                      </details>
                    ))}
                  </div>
                )}
              </details>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AccountingTree;
