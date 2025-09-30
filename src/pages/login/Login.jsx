import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBg from '../../../public/images/home/login-bg.jpeg';
import loginLogo from '../../../public/images/home/login-logo.jfif';
import loginEmail from '../../../public/images/home/login-email.svg';
import loginEye from '../../../public/images/home/login-eye.svg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@admin.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setError("❌ البريد الالكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 min-h-screen">
      {/* جزء الصورة */}
      <div className="relative h-[300px] lg:h-screen w-full lg:w-1/2">
        <img src={loginBg} alt="bg" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#09adce]/40"></div>
        <div className="absolute inset-0 text-white p-6 lg:p-20 flex flex-col justify-center items-center lg:items-start text-center lg:text-right">
          <img src={loginLogo} alt="loginLogo" className="w-[120px] h-[100px] lg:w-[160px] lg:h-[130px]" />
          <div className="mt-5">
            <h1 className="text-xl lg:text-[40px] font-bold mb-4 leading-[35px] lg:leading-[55px]">
              برنامج ادارة وتأجير قاعات الافراح
            </h1>
            <h2 className="text-lg lg:text-[30px] font-semibold mb-4 leading-[28px] lg:leading-[45px]">
              Wedding hall management and rental program
            </h2>
            <p className="text-base lg:text-xl mt-6 lg:mt-20">شركة كواكب التقنية</p>
          </div>
        </div>
      </div>

      {/* جزء الفورم */}
      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 px-6 lg:px-12 py-10">
        <img src={loginLogo} alt="bg" className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] object-cover" />
        <h2 className="text-xl lg:text-[24px] font-semibold mt-5">مرحبا بك</h2>
        <h3 className="mt-1 text-gray-500 text-sm lg:text-base">أدخل البريد الالكتروني وكلمة السر للدخول</h3>

        <form className="mt-8 w-full max-w-md" onSubmit={handleLogin}>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="font-semibold text-sm lg:text-base text-right">
              البريد الالكتروني
            </label>
            <div className="relative w-full">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[50px] rounded-lg border border-gray-300 bg-transparent outline-none px-5 w-full placeholder:text-sm lg:placeholder:text-base"
                placeholder="أدخل البريد الألكتروني"
              />
              <img src={loginEmail} alt="email-icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 opacity-70" />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <label htmlFor="password" className="font-semibold text-sm lg:text-base text-right">
              كلمة المرور
            </label>
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-[50px] rounded-lg border border-gray-300 bg-transparent outline-none px-5 w-full placeholder:text-sm lg:placeholder:text-base"
                placeholder="أدخل كلمة المرور"
              />
              <img
                src={loginEye}
                alt="eye-icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 cursor-pointer opacity-70"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <button
            type="submit"
            className="mt-6 w-full bg-[#09adce] text-white py-3 rounded-lg font-semibold hover:bg-[#0894ad] transition"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
