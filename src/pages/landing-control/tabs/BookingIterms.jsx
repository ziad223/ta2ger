import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BookingIterms = () => {
  const [content, setContent] = useState("");

  // خيارات الـ Toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // الصيغ اللي ممكن يستخدمها المستخدم
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

  const handleSave = () => {
    console.log("📌 المحتوى المحفوظ:", content);
    // هنا تقدر تبعته للـ API بتاعك أو تحفظه في DB
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        سياسة الخصوصية
      </h2>

      <div className="bg-white shadow-md  rounded-lg">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="h-[300px] mb-12 rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
      >
         حفظ
      </button>
    </div>
  );
};

export default BookingIterms;
