import React from 'react';
import Container from '../../components/shared/Container';
import { FaGear, FaScaleBalanced } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaBalanceScale, FaChartLine, FaFileInvoice } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import { AiOutlineAccountBook } from "react-icons/ai";


const Report = () => {
    return (
        <div className='min-h-screen my-20'>
            <Container>
                <div className='bg-white shadow-lg p-5 rounded-lg'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <Link to='/report/account-statements' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                              كشف حساب عام</h2>
                            <img src="/images/home/report-1.png" alt="" className='w-[50px] h-[50px]' />
                        </Link>
                        <Link to='/report/employee-report' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>تقرير الموظف</h2>
                            <img src="/images/home/report-2.png" alt="" className='w-[50px] h-[50px]' />
                        </Link>
                        <Link to='/report/expenses' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                                المصروفات</h2>
                            <img src="/images/home/report-3.png" alt="" className='w-[50px] h-[50px]' />
                        </Link>
                         <Link to='/report/financial-advance' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                                 المقدم المالى</h2>
                            <img src="/images/home/report-4.png" alt="" className='w-[50px] h-[50px]' />
                        </Link>
                         <Link to='/report/client-report' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                                تقرير العميل
</h2>
                            <img src="/images/home/report-5.png" alt="" className='w-[50px] h-[50px]' />
                        </Link>
                        
                        <Link to='/report/halls-report' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                                  تقرير القاعات</h2>
                            <img src="/images/home/report-6.png" alt="" className='w-[50px] h-[50px]' />
                        </Link>
                         <Link to='/report/bond-report' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-xl'>
                               تقرير السندات</h2>
                            <img src="/images/home/report-7.png" alt="" className='w-[50px] h-[50px]' />
                        </Link>

                         <Link to='/report/receipt-and-disbursement-voucher-report' className='rounded-lg bg-[#f8f9fa] transition hover:scale-105 duration-300 cursor-pointer flex flex-col gap-3 lg:h-[130px] p-3 items-center justify-center'>
                            <h2 className='font-bold text-lg'>
                                 تقرير سندات القبض والصرف
</h2>
                            <img src="/images/home/report-6.png" alt="" className='w-[50px] h-[50px]' />
                        </Link>


                    </div>
                </div>
            </Container>

        </div>
    );
}

export default Report;
