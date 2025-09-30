import React from 'react';
import Container from '../components/shared/Container';
import { IoBag } from 'react-icons/io5';
import HomeCard from '../components/home/HomeCard';
import HomeStatistics from '../components/home/HomeStatistics';
import HomeChart from '../components/home/HomeChart';

const Home = () => {
  return (
    <Container>
      <div className="mt-14 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-black text-xl font-bold">برنامج ادارة القاعات</h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
            {/* Today Reservations */}
            <div className="bg-white w-full sm:w-auto h-[50px] px-4 flex items-center gap-2 shadow-sm rounded-lg">
              <div className="w-[30px] h-[30px] rounded-md bg-[#d1ecf1] flex items-center justify-center">
                <IoBag size={18} className="text-[#09adce]" />
              </div>
              <span className="text-sm sm:text-base">حجوزات اليوم : 0</span>
            </div>

            {/* Tomorrow Reservations */}
            <div className="bg-white w-full sm:w-auto h-[50px] px-4 flex items-center gap-2 shadow-sm rounded-lg">
              <div className="w-[30px] h-[30px] rounded-md bg-[#d4edda] flex items-center justify-center">
                <IoBag size={18} className="text-[#28a745]" />
              </div>
              <span className="text-sm sm:text-base">حجوزات الغد : 0</span>
            </div>
          </div>
        </div>
       <HomeCard/>
       <HomeStatistics/>
       <HomeChart/>
      
      </div>
    </Container>
  );
};

export default Home;
