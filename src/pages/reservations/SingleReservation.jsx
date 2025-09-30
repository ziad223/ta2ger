import { FaChevronLeft, FaPrint } from "react-icons/fa";
import Container from "../../components/shared/Container";
import logo from "../../../public/images/home/login-logo.png";

export default function SingleReservation() {
  return (
    <Container>
      <div className="my-10 min-h-screen px-3 sm:px-5">
        <div className="w-full mx-auto">
          {/* أزرار الطباعة والرجوع */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 w-full sm:w-auto justify-center"
            >
              <span>طباعة</span>
              <span className="text-sm">
                <FaPrint />
              </span>
            </button>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 w-full sm:w-auto justify-center"
            >
              <span>رجوع</span>
              <span className="text-sm mt-1">
                <FaChevronLeft />
              </span>
            </button>
          </div>
        </div>

        {/* محتوى العقد */}
        <div className="bg-white p-6 mt-5 rounded-lg shadow text-center">
          <h2 className="text-lg font-bold mb-5">
            عقد إيجار قاعة النورس - رقم العقد (63)
          </h2>

          {/* بيانات الطرفين */}
          <div className="border-2 border-gray-700 py-5 lg:px-20 mt-5 rounded-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-5">
              <div className="flex flex-col gap-3 items-start font-bold text-base">
                <h3>قاعة المعالي الكبرئ</h3>
                <h3>جدة - الحرازات</h3>
                <h3>الرقم الضريبي: 302214006200003</h3>
                <h3>الجوال: 0503085393</h3>
              </div>
              <img src={logo} alt="logo" className="w-32 h-32" />
              <div className="flex flex-col gap-3 items-start font-bold text-base">
                <p>شيخ1</p>
                <p>الرقم الضريبي:</p>
                <p>الجوال: 0545477164</p>
              </div>
            </div>
          </div>

          {/* موضوع العقد */}
          <div className="text-right mt-8 space-y-5 leading-8">
            <h3 className="font-bold">أولاً: موضوع العقد</h3>
            <p>
              يتعهد الطرف الأول بتأجير قاعة قاعة النورس للطرف الثاني لإقامة
              مناسبة:
            </p>
            <ul className="pr-6" style={{ listStyleType: "'🔹'" }}>
              <li>نوع المناسبة: زواج</li>
              <li>تاريخ المناسبة: 2025/09/30 فاتورة رقم: 62</li>
              <li>
                عدد ( 0 ) عماله بالقيام على خدمة الرجال بالإضافة الي عدد ( 0 )
                عاملات لخدمة النساء
              </li>
            </ul>

            <h3 className="font-bold">ثانيًا: القيمة والدفعات المالية</h3>
            <ul className="pr-6" style={{ listStyleType: "'🔹'" }}>
              <li>
                قيمة الإيجار:{" "}
                <span className="font-bold bg-[#f2f0f0] px-2 rounded-full">
                  1,150.00
                </span>{" "}
                ريال سعودي
              </li>
              <li>
                العربون المدفوع:{" "}
                <span className="font-bold bg-[#f2f0f0] px-2 rounded-full">
                  1,000.00
                </span>{" "}
                ريال سعودي
              </li>
              <li>
                المتبقي:{" "}
                <span className="font-bold bg-[#f2f0f0] px-2 rounded-full">
                  150.00
                </span>{" "}
                ريال سعودي يُسدد قبل المناسبة بـ 7 أيام.
              </li>
            </ul>

            <h3 className="font-bold">أولاً: موضوع العقد</h3>
            <p>
              يتعهد الطرف الأول بتأجير قاعة المناسبات للطرف الثاني لإقامة
              مناسبة:
            </p>
            <ul className="pr-6" style={{ listStyleType: "'🔹'" }}>
              <li>
                نوع المناسبة: __________________________ (زواج / ملكة / تخرج /
                مناسبة خاصة أخرى)
              </li>
              <li>تاريخ المناسبة: __/__/____م</li>
              <li>الوقت: من الساعة __:__ مساءً إلى الساعة __:__ صباحًا</li>
            </ul>

            <h3 className="font-bold">ثانيًا: القيمة والدفعات المالية</h3>
            <ul className="pr-6 list-disc" style={{ listStyleType: "'🔹'" }}>
              <li>قيمة الإيجار: ____________ ريال سعودي</li>
              <li>العربون المدفوع: ____________ ريال سعودي</li>
              <li>
                المتبقي: ____________ ريال سعودي يُسدد قبل المناسبة بـ 7 أيام.
              </li>
              <li>
                التأمين المسترد: ____________ ريال سعودي (يُعاد بعد المناسبة في
                حال عدم وجود أضرار أو مخالفات).
              </li>
            </ul>

            <h3 className="font-bold">ثالثًا: الشروط العامة</h3>
            <ul
              className="pr-6 list-decimal space-y-2"
              style={{ listStyleType: "'🔹'" }}
            >
              <li>صلاحية العقد: ساري بتوقيع الطرفين ودفع العربون.</li>
              <li>
                في حال الإلغاء:
                <ul className="pr-6 list-disc">
                  <li>قبل الموعد بـ14 يومًا أو أكثر: يُعاد 50٪ من العربون.</li>
                  <li>قبل الموعد بأقل من 14 يومًا: لا يُعاد أي مبلغ.</li>
                </ul>
              </li>
              <li>
                يمنع منعًا باتًا:
                <ul
                  className="pr-6 list-disc"
                  style={{ listStyleType: "'🔹'" }}
                >
                  <li>استخدام أو إشعال الألعاب النارية داخل أو خارج القاعة.</li>
                  <li>
                    إطلاق النار أو استخدام أي نوع من الأسلحة داخل حدود القاعة أو
                    ساحاتها.
                  </li>
                  <li>
                    إدخال أو استخدام المشروبات المحرمة أو المواد المخالفة
                    للنظام.
                  </li>
                </ul>
              </li>
              <li>
                أي أضرار في القاعة أو محتوياتها يتحملها الطرف الثاني، وتُخصم من
                مبلغ التأمين.
              </li>
              <li>
                الطرف الثاني مسؤول عن الترتيب والتنظيم داخل القاعة، ويجب
                الالتزام بالنظام والتعليمات العامة.
              </li>
            </ul>

            <h3 className="font-bold">رابعًا: أحكام ختامية</h3>
            <ul
              className="pr-6 list-disc space-y-2"
              style={{ listStyleType: "'🔹'" }}
            >
              <li>
                في حال وجود أي نزاع، يتم الرجوع للجهات الرسمية بالمملكة العربية
                السعودية.
              </li>
              <li>
                لا يجوز للطرف الثاني تأجير القاعة أو التنازل عنها لطرف ثالث دون
                موافقة كتابية من الطرف الأول.
              </li>
            </ul>
          </div>

          {/* التوقيع */}
          <div className="mt-10 text-right">
            <h3 className="font-bold mb-3">التوقيع:</h3>
            <div className="space-y-8 flex items-center justify-between px-5">
              <div>
                <p>الطرف الأول (المؤجر):</p>
                <p>الاسم / &gt;sheikh&gt;</p>
                <p>التوقيع / ---------------------</p>
              </div>
              <div>
                <p>الطرف الثاني (المستأجر):</p>
                <p>الاسم / سمير صالح</p>
                <p>التوقيع / ---------------------</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
