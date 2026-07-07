import React, { useState } from 'react';

const CreativeProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(1);

  const specs = [
    { label: "Microcontroller", value: "ATmega328P" },
    { label: "Operating Voltage", value: "5V" },
    { label: "Input Voltage (recommended)", value: "7-12V" },
    { label: "Digital I/O Pins", value: "14 (6 PWM)" },
    { label: "Analog Input Pins", value: "6" },
    { label: "Flash Memory", value: "32 KB" },
  ];

  const alternatives = [
    {
      name: "Arduino Nano",
      price: "$18.50",
      status: "In Stock",
      statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/50",
      note: "Similar performance",
      img: "https://images.unsplash.com/photo-1608564697171-2ed891c32c44?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "ESP32 DevKit",
      price: "$12.90",
      status: "In Stock",
      statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/50",
      note: "More features",
      img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Arduino Mega 2560",
      price: "$35.00",
      status: "Limited Stock",
      statusColor: "text-amber-400 border-amber-500/20 bg-amber-500/5",
      glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:border-amber-500/50",
      note: "More I/O pins",
      img: "https://images.unsplash.com/photo-1608564697171-2ed891c32c44?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white px-4 sm:px-6 lg:px-8 pb-24 font-sans select-none relative overflow-hidden">
      
      {/* تأثير الإضاءة الخلفية المحيطية (Aura Glow) */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none z-0"></div>

      <style>{`
        .premium-glass { background: linear-gradient(135deg, rgba(15, 23, 42, 0.45) 0%, rgba(3, 7, 18, 0.75) 100%); backdrop-filter: blur(20px); }
        .inner-neon { box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.05); }
      `}</style>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* زر العودة بتأثير السهم المرن */}
        <div className="inline-flex items-center gap-2 text-slate-400 text-xs hover:text-blue-400 cursor-pointer mb-8 pt-6 transition-all duration-200 group">
          <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:-translate-x-1">arrow_back</span>
          <span className="font-medium tracking-wide">Back to Components</span>
        </div>

        {/* =================== شبكة تفاصيل المنتج الرئيسية =================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* 1. معرض الصور ثلاثي الأبعاد الزجاجي (4 أعمدة) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="premium-glass inner-neon border border-slate-800/80 rounded-2xl p-6 aspect-square flex items-center justify-center group relative overflow-hidden shadow-2xl">
              {/* تدرج لوني خفي خلف الصورة يضيء عند الهوفر */}
              <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=500&q=80" 
                alt="Arduino Uno R3" 
                className="w-4/5 h-4/5 object-contain object-center transform group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500 ease-out"
              />
              
              <button className="absolute bottom-4 right-4 bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 p-2.5 rounded-xl transition-all shadow-lg">
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
            </div>

            {/* المصغرات التفاعلية مع البوردر المشع */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveThumb(i)}
                  className={`premium-glass border ${activeThumb === i ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-slate-800/60'} rounded-xl p-3 aspect-square flex items-center justify-center cursor-pointer hover:border-slate-600 transition-all duration-300 transform active:scale-95`}
                >
                  <img src="https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=120&q=80" alt="thumb" className="w-full h-full object-contain opacity-80 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* 2. لوحة البيانات والـ Cyber Spec Nodes (5 أعمدة) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400">Arduino Uno R3</h1>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase animate-pulse">
                In Stock
              </span>
            </div>

            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 font-light">
              The Arduino Uno is a premium microcontroller board based on the ATmega328P. 
              Engineered for seamless digital input/output mapping & processing.
            </p>

            <div className="text-3xl font-extrabold tracking-tight text-white mb-6 bg-clip-text">$24.99</div>

            {/* أزرار التحكم والـ Add To Cart النيون */}
            <div className="flex items-center gap-4 mb-8 w-full">
              <div className="flex items-center bg-slate-950/80 border border-slate-800/80 rounded-xl px-2 shadow-inner">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-slate-500 hover:text-white px-2 py-2 text-xl transition-colors font-medium">-</button>
                <span className="text-white px-3 py-2 text-sm font-bold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-slate-500 hover:text-white px-2 py-2 text-xl transition-colors font-medium">+</button>
              </div>

              <button className="flex-1 bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/10 active:scale-[0.98]">
                Add to Cart
              </button>

              <button className="premium-glass border border-slate-800/80 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 p-3.5 rounded-xl transition-all shadow-md group">
                <span className="material-symbols-outlined text-[20px] transform group-hover:scale-110 transition-transform">favorite</span>
              </button>
            </div>

            {/* جدول المواصفات المضيء بمسارات النيون */}
            <div className="flex flex-col border-t border-slate-900 pt-6 mb-8 gap-1">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5 text-xs md:text-sm border-b border-slate-900/30 last:border-none group">
                  <div className="flex items-center gap-2">
                    {/* النقطة النابضة الإلكترونية */}
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                    <span className="text-slate-400 group-hover:text-slate-300 transition-colors font-normal">{spec.label}</span>
                  </div>
                  <span className="text-slate-200 group-hover:text-white transition-colors font-semibold tracking-wide bg-slate-950/40 px-2 py-0.5 rounded-md border border-transparent group-hover:border-slate-800/40">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* زر الداتاشيت الزجاجي الفاخر */}
            <button className="w-full premium-glass border border-blue-500/20 hover:border-blue-500/50 text-blue-400 hover:text-blue-300 font-bold py-3.5 px-4 rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-md group">
              <span className="material-symbols-outlined text-[18px] animate-pulse">terminal</span>
              <span>View Full Datasheet Blueprint</span>
            </button>
          </div>

          {/* 3. كارت الـ Datasheet Preview ثلاثي الأبعاد المشرق (3 أعمدة) */}
          <div className="lg:col-span-3 premium-glass border border-slate-800/60 rounded-2xl p-4 flex flex-col items-center shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all duration-500 group/ds">
            <div className="w-full text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-4 text-left pl-1 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-blue-500"></span>
              <span>Datasheet Preview</span>
            </div>
            
            {/* غلاف الداتاشيت الفاخر المعزز بظل قوي */}
            <div className="bg-white rounded-xl p-5 w-full aspect-[3/4] flex flex-col justify-between text-black shadow-[0_15px_35px_rgba(0,0,0,0.6)] transform group-hover/ds:-translate-y-1.5 transition-transform duration-500 select-none relative overflow-hidden border border-slate-200">
              <div className="flex flex-col gap-1 relative z-10">
                <div className="text-[16px] font-black tracking-tighter text-slate-950 leading-none">ARDUINO</div>
                <div className="text-[13px] font-extrabold tracking-tight text-slate-800">UNO REV3</div>
                <div className="h-[2px] w-8 bg-blue-600 my-1"></div>
                <div className="text-[8px] text-slate-500 font-semibold tracking-wide uppercase">Product Reference Manual</div>
              </div>
              <div className="flex justify-end relative z-10">
                <div className="text-[9px] font-black border-2 border-slate-950 px-1.5 py-0.5 rounded text-slate-950 tracking-tighter bg-white">
                  ARDUINO
                </div>
              </div>
            </div>

            {/* أزرار تقليب نيون دائرية خفيفة */}
            <div className="flex items-center justify-between w-full px-2 mt-5 text-slate-400 text-xs font-semibold">
              <button className="w-8 h-8 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 hover:text-white flex items-center justify-center transition-all">
                <span className="material-symbols-outlined text-[16px]">arrow_back_ios_new</span>
              </button>
              <span className="tracking-widest text-slate-300 bg-slate-950/40 px-3 py-1 rounded-full border border-slate-900">1 / 28</span>
              <button className="w-8 h-8 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 hover:text-white flex items-center justify-center transition-all">
                <span className="material-symbols-outlined text-[16px]">arrow_forward_ios</span>
              </button>
            </div>
          </div>

        </div>

        {/* =================== سيكشن المكونات البديلة الذكية المضيئة =================== */}
        <div className="flex flex-col border-t border-slate-900 pt-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
            <h2 className="text-lg font-bold tracking-wide">Smart Microcomponent Alternatives</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {alternatives.map((alt, index) => (
              <div 
                key={index} 
                className={`premium-glass border border-slate-800/60 rounded-2xl p-4 flex items-center justify-between group transition-all duration-500 ${alt.glowColor} hover:-translate-y-2 cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  {/* حاوية صورة المكون البديل الغامضة */}
                  <div className="bg-slate-950/80 p-2.5 rounded-xl w-16 h-16 flex items-center justify-center border border-slate-900 overflow-hidden inner-neon transition-transform duration-300 group-hover:scale-105">
                    <img src={alt.img} alt={alt.name} className="w-full h-full object-cover rounded-lg opacity-90" />
                  </div>
                  
                  {/* بيانات المكون الفنية */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-white text-[14px] font-bold tracking-wide group-hover:text-blue-400 transition-colors">{alt.name}</h3>
                    <div className="text-slate-100 text-xs font-black">{alt.price}</div>
                    
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${alt.statusColor}`}>
                        {alt.status}
                      </span>
                      <span className="text-slate-500 text-[10px] font-medium">{alt.note}</span>
                    </div>
                  </div>
                </div>

                {/* زر إضافة سريع للسلة يتحول بالكامل للنيون عند الهوفر */}
                <button className="bg-slate-950/80 border border-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500/50 p-3 rounded-xl transition-all duration-300 shadow-md transform active:scale-90">
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreativeProductPage;