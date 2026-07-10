import React from 'react';
import Header from "./Header";
import { Play, ExternalLink, Cpu, LayoutGrid, Zap, ShieldCheck, CircuitBoard } from 'lucide-react';

function LogicSimulator() {
  
  const templates = [
    {
      title: "Blank Breadboard",
      desc: "Empty workspace with a standard breadboard and power supply ready for your custom circuits.",
      img: "/images/blank breadboard.png",
      link: "https://www.tinkercad.com/things/4S1NR5dGjWC-blank-breadboard",
      icon: LayoutGrid,
      color: "text-blue-400"
    },
    {
      title: "Basic Gates Setup",
      desc: "Pre-loaded environment with common Logic ICs (AND, OR, NOT, NAND) wired and ready to test.",
      img: "/images/ICs.png",
      link: "https://www.tinkercad.com/things/b7XweYmmLnC-basic-logic-gates",
      icon: CircuitBoard,
      color: "text-emerald-400"
    },
    {
      title: "Microcontroller Ready",
      desc: "Arduino Uno linked, wired, and ready for C++ code injection and sensor integration.",
      img: "/images/Microcontroller Ready.png",
      link: "https://www.tinkercad.com/projects/Tinkercad-Blinking-LED-Lights",
      icon: Cpu,
      color: "text-amber-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[url('/images/bg-circuit.jpg')] bg-cover bg-fixed bg-center relative font-sans text-gray-200 select-none">
      
      <div className="absolute inset-0 bg-[#070b14]/80 z-0"></div>

      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        <Header />

        <style>{`
          @keyframes floatUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
          .fade-up { animation: floatUp .6s cubic-bezier(.16,1,.3,1) both; }
        `}</style>

        <div className="flex-1 overflow-y-auto px-6 pb-20 pt-24 sm:px-10 scroll-smooth">
          <div className="max-w-[1200px] mx-auto">
            
            <div className="flex flex-col items-center text-center mt-10 mb-16">
              <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/20 px-5 py-2 text-xs font-bold tracking-widest text-blue-400 uppercase">
                <Zap size={14} className="text-amber-400" /> Virtual Electronics Workspace
              </div>
              
              <h1 className="fade-up text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight" style={{ animationDelay: "100ms" }}>
                Logic Simulator <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">& Prototyping Lab</span>
              </h1>
              
              <p className="fade-up max-w-2xl text-base md:text-lg text-gray-400 mb-10 leading-relaxed" style={{ animationDelay: "200ms" }}>
                A high-fidelity simulation environment powered by Tinkercad Engine. Build, wire, and test your circuits safely before touching physical hardware.
              </p>

              <div className="fade-up" style={{ animationDelay: "300ms" }}>
                <button
                  onClick={() => window.open("https://www.tinkercad.com/circuits", "_blank")}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-95 flex items-center gap-3 group"
                >
                  <Play size={20} className="fill-white group-hover:scale-110 transition-transform" />
                  Launch Simulator Engine
                </button>
              </div>
            </div>

            <div className="fade-up w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent my-16" style={{ animationDelay: "400ms" }}></div>

            <div className="fade-up mb-12" style={{ animationDelay: "450ms" }}>
              <h2 className="text-2xl font-extrabold text-white tracking-wide mb-2 text-center">Quick Start Templates</h2>
              <p className="text-gray-400 text-sm text-center mb-10">Choose a pre-configured environment to jumpstart your design.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template, index) => (
                  <div 
                    key={index}
                    onClick={() => window.open(template.link, "_blank", "noopener noreferrer")}
                    className={`fade-up cursor-pointer group bg-[#0d1323]/60 backdrop-blur-md p-6 rounded-3xl border border-gray-800/60 hover:border-blue-500/40 transition-all duration-300 flex flex-col h-full hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]`}
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <div className="w-full aspect-video bg-[#070b14] rounded-2xl mb-6 flex items-center justify-center border border-gray-800 overflow-hidden relative group-hover:border-blue-500/30 transition-colors">
                      <template.icon size={48} className={`${template.color} opacity-20 absolute`} />
                      <img 
                        src={template.img} 
                        alt={template.title} 
                        className="w-3/4 h-3/4 object-contain z-10 transform group-hover:scale-110 transition-transform duration-500" 
                        onError={(e) => { e.target.style.display = 'none'; }} 
                      />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                      {template.title}
                      <ExternalLink size={16} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                    </h3>
                    
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                      {template.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up text-center mt-20" style={{ animationDelay: "800ms" }}>
              <p className="text-xs text-gray-600 flex items-center justify-center gap-2 font-mono tracking-widest uppercase">
                <ShieldCheck size={14} className="text-emerald-500/50" /> 
                Simulation Engine: Launchpad Link v2.5 | Integrated with Tinkercad API
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LogicSimulator;