import React from 'react';
import Header from './Header'; // استدعي كومبونينت الهيدر بتاعك هنا

const CreativeHeroWithCards = () => {
  const cardsData = [
    {
      title: "Datasheets Library",
      description: "Find, review, and organize datasheets easily.",
      linkText: "Explore Library",
      icon: "description",
      glowColor: "group-hover:text-blue-400 text-blue-500/80",
      accentBg: "bg-blue-500/10",
      borderColor: "border-blue-500/20 hover:border-blue-400/60",
      neonShadow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
      lineColor: "bg-gradient-to-r from-blue-500 to-transparent"
    },
    {
      title: "Project Generator",
      description: "Generate full component lists and step-by-step guides.",
      linkText: "Try Generator",
      icon: "schema",
      glowColor: "group-hover:text-cyan-400 text-cyan-500/80",
      accentBg: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20 hover:border-cyan-400/60",
      neonShadow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]",
      lineColor: "bg-gradient-to-r from-cyan-500 to-transparent"
    },
    {
      title: "Smart Alternatives",
      description: "Out of stock? Find the perfect alternative component based on specs.",
      linkText: "Find Alternatives",
      icon: "published_with_changes",
      glowColor: "group-hover:text-emerald-400 text-emerald-500/80",
      accentBg: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20 hover:border-emerald-400/60",
      neonShadow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]",
      lineColor: "bg-gradient-to-r from-emerald-500 to-transparent"
    },
    {
      title: "Logic Simulator (Logic Design)",
      description: "Build and test digital logic circuits in real-time.",
      linkText: "Launch Simulator",
      icon: "device_hub",
      glowColor: "group-hover:text-amber-400 text-amber-500/80",
      accentBg: "bg-amber-500/10",
      borderColor: "border-amber-500/20 hover:border-amber-400/60",
      neonShadow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]",
      lineColor: "bg-gradient-to-r from-amber-500 to-transparent"
    }
  ];

  return (
    // ضبط الحاوية لتكون 100% من طول الشاشة بالظبط بدون سكرول
    <div className="relative h-screen bg-[#030712] text-white overflow-hidden select-none font-sans flex flex-col justify-between">
      
      {/* 1. تأثيرات الخلفية والـ SVG المتحرك */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <svg className="absolute w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 100h500l100 100h400l50-50h500" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5 5" className="animate-[dash_20s_linear_infinite]" />
          <path d="M200 -100v400l100 100v500" fill="none" stroke="#10b889" strokeWidth="1" strokeDasharray="6 4" className="animate-[dash_15s_linear_infinite]" />
        </svg>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <style>{`
        @keyframes dash { to { stroke-dashoffset: -1000; } }
        .glass-panel { background: linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(3, 7, 18, 0.9) 100%); }
      `}</style>

      {/* ==================== مكان الهيدر الخارجي بتاعك ==================== */}
      {/* <Header /> */}
      {/* سبيسر تجميلي مؤقت يمثل حجز مكان الهيدر لعدم التداخل */}
      <div className="h-20 w-full flex-shrink-0 relative z-20"></div>

      {/* المحتوى الداخلي الموزع والموزون "الواخد هواه" */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center items-center w-full">
        
        {/* ==================== HERO SECTION ==================== */}
        <div className="w-full text-center flex flex-col items-center mb-auto pt-4">
          
          {/* الشارة الصغيرة العائمة */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/30 text-[11px] font-semibold uppercase tracking-widest text-blue-400 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
            <span>Next-Gen Embedded Environment</span>
          </div>

          {/* العنوان السينمائي الكبير */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-5 max-w-4xl leading-[1.15]">
            Your All-in-One <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">
              Electronics
            </span> Platform
          </h1>

          {/* الوصف الواخد هواه */}
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mb-8 font-light leading-relaxed tracking-wide">
            Find datasheets, discover components, generate project requirements, and buy everything you need — all within a unified ecosystem.
          </p>

          {/* بار البحث الفاخر */}
          <div className="w-full max-w-2xl bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-slate-800 p-1.5 flex items-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] focus-within:border-blue-500/50 transition-all duration-300">
            <div className="flex-1 flex items-center gap-3 pl-3">
              <span className="material-symbols-outlined text-slate-500 text-[20px]">search</span>
              <input 
                type="text" 
                placeholder="Search components, part numbers or datasheets..." 
                className="w-full bg-transparent py-2.5 text-white placeholder-slate-500 text-sm border-none outline-none focus:ring-0"
              />
            </div>

            <div className="h-6 w-[1px] bg-slate-800 hidden sm:block"></div>
            
            <div className="relative hidden sm:flex items-center gap-1 px-3 py-1 cursor-pointer text-slate-400 hover:text-white transition-colors text-xs font-semibold">
              <span>All</span>
              <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
            </div>

            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-150">
              Search
            </button>
          </div>

        </div>

        {/* ==================== CARDS SECTION ==================== */}
        {/* تم تقليص الـ padding والـ gap وتوسيع المسافات الرأسية لتستقر الكروت في قاع الـ viewport بنعومة */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-full pb-12 mt-auto">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`glass-panel border ${card.borderColor} rounded-2xl p-5 flex flex-col justify-between min-h-[180px] transition-all duration-500 ease-out ${card.neonShadow} hover:-translate-y-2.5 cursor-pointer group relative overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 h-[2px] w-0 group-hover:w-full ${card.lineColor} transition-all duration-500`}></div>

              <div className="flex items-start gap-4">
                <div className={`${card.accentBg} ${card.glowColor} p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                  <span className="material-symbols-outlined text-[30px] font-light select-none">
                    {card.icon}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-white text-[15px] font-bold mb-1.5 tracking-wide">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-[12px] font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-2">
                <div className={`inline-flex items-center gap-1 text-[12px] font-bold tracking-wide ${card.glowColor} transition-all duration-200`}>
                  <span>{card.linkText}</span>
                  <span className="material-symbols-outlined text-[14px] transition-transform duration-300 group-hover:translate-x-1.5">
                    arrow_right_alt
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CreativeHeroWithCards;