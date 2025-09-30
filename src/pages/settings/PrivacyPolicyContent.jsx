import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { FaBuffer, FaCreditCard, FaUsers, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function PrivacyPolicyContent() {
    const [content, setContent] = useState("");
  
    // الأدوات (Toolbar Options)
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }], // العناوين
        [{ font: [] }], // نوع الخط
        [{ size: [] }], // حجم الخط
        ["bold", "italic", "underline", "strike"], // تنسيقات أساسية
        [{ color: [] }, { background: [] }], // ألوان النص والخلفية
        [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
        [{ align: [] }], // المحاذاة
        [{ list: "ordered" }, { list: "bullet" }], // القوائم
        ["blockquote", "code-block"], // اقتباس وكود
        ["link", "image", "video"], // إدراج وسائط
        ["clean"], // مسح التنسيق
      ],
    };
  
    const formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "script",
      "align",
      "list",
      "bullet",
      "blockquote",
      "code-block",
      "link",
      "image",
      "video",
    ];
  
    return (
      <Container>
        <div className="p-4 min-h-screen">
          <div className="flex items-center flex-col lg:flex-row  justify-between w-full my-10 ">
            <h2 className="text-xl font-bold">سياسة الخصوصية</h2>
            <div className="flex items-center gap-2 flex-col lg:flex-row">
              <Link
                to="/settings/employees"
                className="flex items-center  gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
              >
                <span>الموظفين</span>
                <FaUsers />
              </Link>
              <Link
                to="/settings/sections"
                className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
              >
                <span>الأقسام</span>
                <FaBuffer />
              </Link>
              <Link
                to="/settings/privacy-policy"
                className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
              >
                <span>سياسة الخصوصية</span>
                <FaUserShield />
              </Link>
              <Link
                to="/settings/pay-ways"
                className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
              >
                <span>طرق الدفع</span>
                <FaCreditCard />
              </Link>
            </div>
          </div>
  
          <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              className="h-[300px] mb-10 rtl-editor"
            />
          </div>
  
          <button
            onClick={() => console.log(content)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            حفظ
          </button>
        </div>
      </Container>
    );
}
