import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#06101e]/80 backdrop-blur-md border-b border-slate-800/50 text-white select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* الـ Logo مع الأيقونة البرق على الشمال */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-[#3b82f6] text-[26px] font-bold">
              bolt
            </span>
            <span className="text-xl font-semibold tracking-wide text-slate-100">
              ElectroHub
            </span>
          </div>

          <div className="hidden xl:flex items-center space-x-5 text-[14px] font-medium">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-[#3b82f6] pb-1 px-1"
                  : "text-slate-400 hover:text-white transition-colors duration-200"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/components"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Components Library
            </NavLink>

            <NavLink
              to="/datasheets"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Datasheet Library
            </NavLink>

            <NavLink
              to="/logic"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Logic Simulator
            </NavLink>

            <NavLink
              to="/project-generator"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Project Generator
            </NavLink>

            <NavLink
              to="/shopping-cart"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Shopping Cart
            </NavLink>

            <NavLink
              to="/user-dashboard"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              User Dashboard
            </NavLink>

            <NavLink
              to="/social"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Social
            </NavLink>
          </div>
          {/* الأيقونات التلاتة على اليمين بالظبط (بحث، سلة مع إشعار، بروفايل دائرى) */}
          <div className="hidden xl:flex items-center space-x-4">
            <button className="p-1.5 text-slate-400 hover:text-white transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">
                search
              </span>
            </button>

            <button className="p-1.5 text-slate-400 hover:text-white relative transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">
                shopping_cart
              </span>
              {/* شارة الإشعار الحمراء الدائرية فوق السلة */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* الصورة الشخصية الدائرية للمستخدم */}
            <div className="w-8 h-8 rounded-full border border-slate-600 overflow-hidden cursor-pointer hover:border-slate-400 transition-all">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* زر الموبايل والـ Hamburger Menu للشاشات الصغيرة */}
          <div className="xl:hidden flex items-center space-x-3">
            <button className="p-1.5 text-slate-400 hover:text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">
                shopping_cart
              </span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 focus:outline-none transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[26px]">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* القائمة المنسدلة للموبايل والتابلت */}
      <div
        className={`xl:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        <div className="px-3 pt-2 pb-4 space-y-1 bg-[#06101e] border-b border-slate-800 shadow-2xl text-[15px]">
          <NavLink
            to="/home"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-white bg-slate-800/40 font-medium"
          >
            Home
          </NavLink>

          <NavLink
            to="/components"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/30"
          >
            Components Library
          </NavLink>

          <NavLink
            to="/datasheets"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/30"
          >
            Datasheet Library
          </NavLink>

          <NavLink
            to="/logic"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/30"
          >
            Logic Simulator
          </NavLink>

          <NavLink
            to="/project-generator"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/30"
          >
            Project Generator
          </NavLink>

          <NavLink
            to="/shopping-cart"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/30"
          >
            Shopping Cart
          </NavLink>

          <NavLink
            to="/user-dashboard"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/30"
          >
            User Dashboard
          </NavLink>

          <NavLink
            to="/social"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/30"
          >
            Social
          </NavLink>

          <div className="pt-4 mt-2 border-t border-slate-800/60 flex items-center justify-between px-3">
            <span className="text-sm text-slate-400 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">
                search
              </span>
              Search Components
            </span>

            <div className="w-8 h-8 rounded-full border border-slate-600 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
