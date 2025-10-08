export const DeleteClientModal = ({ client, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-[350px] text-center">
        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p className="mb-5">هل أنت متأكد أنك تريد حذف {client.name}؟</p>
        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border w-full"
          >
            إلغاء
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-md bg-red-500 text-white w-full"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};
