import React from 'react';
import Container from '../../components/shared/Container';
import { FaGear, FaScaleBalanced } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaBalanceScale, FaChartLine, FaFileInvoice, FaUsers } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import { AiOutlineAccountBook } from "react-icons/ai";


const Accounting = () => {
    return (
        <div className='min-h-screen my-20'>
            <Container>
                <div className='bg-white shadow-lg p-5 rounded-lg'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <Link to='/account-settings' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>اعدادات الحسابات</h2>
                            <FaGear className='text-[#17a2b8] text-4xl' />
                        </Link>
                        <Link to='/account-tree' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                                الشجرة المحاسبية</h2>
                            <FaBalanceScale className='text-[#17a2b8] text-4xl' />
                        </Link>
                         <Link to='/restrictions' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                                 القيود</h2>
                            <IoDocumentText className='text-[#17a2b8] text-4xl' />
                        </Link>
                         <Link to='/account-statement' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                                 سندات القبض والصرف</h2>
                            <FaFileInvoice  className='text-[#17a2b8] text-4xl' />
                        </Link>
                        <Link to='/account-statement' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                              كشف حساب عام</h2>
                            <AiOutlineAccountBook   className='text-[#17a2b8] text-4xl' />
                        </Link>
                        <Link to='/tax-return' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                                 الاقرار الضريبي</h2>
                            <IoDocumentText className='text-[#17a2b8] text-4xl' />
                        </Link>
                         <Link to='/suppliers' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                                الموردين</h2>
                            <FaUsers  className='text-[#17a2b8] text-4xl' />
                        </Link>

                         <Link to='/income-statement' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                                قائمة الدخل</h2>
                            <FaChartLine className='text-[#17a2b8] text-4xl' />
                        </Link>


                    </div>
                </div>
            </Container>

        </div>
    );
}

export default Accounting;
