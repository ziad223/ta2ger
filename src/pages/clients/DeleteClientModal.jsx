import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import apiServiceCall from '../../utils/apiServiceCall';

const DeleteClientModal = ({ isOpen, onClose, client, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!client?.id) {
      toast.error('لا يوجد عميل محدد للحذف');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await apiServiceCall({
        url: `clients/${client.id}`,
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response?.status) {
        toast.success(response?.message || 'تم حذف العميل بنجاح');
        setTimeout(() => onClose(), 1000);
        setTimeout(() => window.location.reload(), 1500);
 
        if (onDeleteSuccess) {
          onDeleteSuccess(client.id);
        }
        
        // إغلاق المودال بعد ثانية
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        toast.error(response?.message || 'حدث خطأ أثناء حذف العميل');
      }
    } catch (error) {
      console.error('Delete client error:', error);
      toast.error(
        error?.response?.data?.message || 
        error?.message || 
        'حدث خطأ غير متوقع أثناء الحذف'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ToastContainer/>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="text-center">
          {/* أيقونة تحذير */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg 
              className="h-6 w-6 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2">
            تأكيد الحذف
          </h3>
          
          <p className="text-sm text-gray-500 mb-6">
            هل أنت متأكد من رغبتك في حذف العميل 
            <span className="font-semibold text-gray-900 mx-1">
              {client?.name}
            </span>
            ؟
            <br />
            <span className="text-red-600 font-medium">
              لا يمكن التراجع عن هذا الإجراء.
            </span>
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            إلغاء
          </button>
          
          <button 
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري الحذف...
              </span>
            ) : (
              'حذف'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;