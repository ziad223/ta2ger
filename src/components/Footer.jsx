import React from "react";
import Container from "./shared/Container"; // يفترض أن يكون هذا الملف أيضاً يستخدم Tailwind
import logo from '../../public/images/home/footer-logo.png'
function Footer() {
  return (
    <div className="py-3   sm:block bg-[#313131]">
      <Container>
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
          <p className="mb-0 text-sm text-gray-100">2025 © جميع الحقوق محفوظة</p>
          <div className="flex items-center justify-center about_data">
            <p className="mb-0 ms-2 text-sm text-gray-100">v - 0.0.2 برنامج ادارة وتأجير قاعات الافراح</p>
          </div>
          <a href="https://www.const-tech.org/">
            <img
              src={logo}
              alt="logo"
              className="h-10 w-32"
            />
          </a>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
