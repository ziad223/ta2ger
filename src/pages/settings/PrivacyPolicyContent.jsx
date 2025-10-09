import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast , ToastContainer } from "react-toastify";
import Container from "../../components/shared/Container";
import { FaBuffer, FaCreditCard, FaUsers, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiServiceCall from "../../utils/apiServiceCall";
import "react-toastify/dist/ReactToastify.css";

export default function PrivacyPolicyContent() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  const [content, setContent] = useState("");

  // استرجاع البيانات الحالية لسياسة الخصوصية
  const { data: settingsResponse, isLoading } = useQuery({
    queryKey: ['privacyPolicy'],
    queryFn: () => apiServiceCall({ 
      url: 'settings/general',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  });

  // تحويل البيانات من API إلى قيمة المحرر
  useEffect(() => {
    if (settingsResponse?.data) {
      const privacyPolicyItem = settingsResponse.data.find(item => item.key === "privacyPolicy");
      if (privacyPolicyItem) {
        setContent(privacyPolicyItem.value || "");
      }
    }
  }, [settingsResponse]);

  // طفرة لتحديث سياسة الخصوصية
  const mutation = useMutation({
    mutationFn: (data) => apiServiceCall({
      url: 'settings/general',
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    onSuccess: () => {
      toast.success('تم حفظ سياسة الخصوصية بنجاح');
      queryClient.invalidateQueries(['privacyPolicy']);
         setTimeout(() => {
      onClose();
    }, 1000);

    setTimeout(() => {
      window.location.reload()
    }, 1500);

    },
    onError: (error) => {
      toast.error('فشل في حفظ سياسة الخصوصية');
      console.error('Error saving privacy policy:', error);
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

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

  // دالة الحفظ
  const onSubmit = () => {
    // إنشاء FormData لاحتواء البيانات
    const formData = new FormData();
    
    // إضافة محتوى سياسة الخصوصية
    formData.append('privacyPolicy', content);
    
    // إرسال البيانات
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <Container>
        <div className="p-4 min-h-screen flex items-center justify-center">
          <div className="text-center">جاري تحميل سياسة الخصوصية...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="p-4 min-h-screen">
        <ToastContainer/>
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

        <form onSubmit={handleSubmit(onSubmit)}>
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
            type="submit"
            disabled={isSubmitting || mutation.isLoading}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting || mutation.isLoading ? 'جاري الحفظ...' : 'حفظ سياسة الخصوصية'}
          </button>
        </form>
      </div>
    </Container>
  );
}