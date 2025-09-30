import React from 'react';
import Container from '../../components/shared/Container';

const notificationsData = [
  {
    id: 1,
    title: "محمد أحمد",
    date: "2025-09-21",
    text: "تم تأكيد حجزك بنجاح في القاعة رقم 3.",
    image: "/images/home/notifications.svg",
  },
  {
    id: 2,
    title: "سارة علي",
    date: "2025-09-20",
    text: "تم إلغاء الحجز الخاص بك، يرجى المحاولة مرة أخرى.",
    image: "/images/home/notifications.svg",
  },
  {
    id: 3,
    title: "أحمد سامي",
    date: "2025-09-19",
    text: "هناك رسالة جديدة بخصوص الحجز الأخير.",
    image: "/images/home/notifications.svg",
  },
  {
    id: 4,
    title: "ليلى حسن",
    date: "2025-09-18",
    text: "تم تحديث بيانات الحجز الخاص بك بنجاح.",
    image: "/images/home/notifications.svg",
  },
  {
    id: 5,
    title: "خالد محمد",
    date: "2025-09-17",
    text: "تم استلام الدفع الخاص بالحجز الأخير.",
    image: "/images/home/notifications.svg",
  },
  {
    id: 6,
    title: "مها علي",
    date: "2025-09-16",
    text: "تذكير: موعد الحجز الخاص بك بعد يومين.",
    image: "/images/home/notifications.svg",
  },
  {
    id: 7,
    title: "أحمد عبد الله",
    date: "2025-09-15",
    text: "تمت إضافة تعليق جديد على حجزك.",
    image: "/images/home/notifications.svg",
  },
  {
    id: 8,
    title: "ندى سمير",
    date: "2025-09-14",
    text: "تمت معالجة طلبك بنجاح.",
    image: "/images/home/notifications.svg",
  },
];

const Notifications = () => {
  return (
    <Container>
      <div className='min-h-screen mt-10'>
        <h2 className='text-lg font-bold mb-5'>الإشعارات</h2>
        
        <div className="grid grid-cols-1  lg:grid-cols-2  gap-6">
          {notificationsData.map((notif) => (
            <div key={notif.id} className='bg-white shadow-lg rounded-lg p-4 flex flex-col'>
              <div className='flex items-center gap-3 mb-3'>
                <img src={notif.image} alt={notif.title} className='w-10 h-10 rounded-full object-cover'/>
                <div>
                  <h3 className='font-bold text-sm'>{notif.title}</h3>
                  <p className='text-xs text-gray-400 mt-0.5'>{notif.date}</p>
                </div>
              </div>
              <p className='text-sm text-gray-700'>{notif.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Notifications;
