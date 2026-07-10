import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Wand2, Cpu, CircuitBoard, ArrowRight, ShoppingCart, ShieldCheck, Loader2 } from 'lucide-react';
import Header from './Header';
import componentsData from '../data/components.json';
import { useCart } from '../CartContext'; 
import { API_BASE_URL } from '../config'; 

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All Categories');

  const [components, setComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { addItem } = useCart(); 

  useEffect(() => {
    if (!API_BASE_URL) {
      setComponents(componentsData);
      setIsLoading(false);
    } else {
      fetch(`${API_BASE_URL}/components`)
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then(response => {
          let fetchedData = response.data || response;
          if (fetchedData && typeof fetchedData === 'object' && !Array.isArray(fetchedData)) {
            fetchedData = fetchedData.items || fetchedData.components || fetchedData.data || Object.values(fetchedData).find(Array.isArray) || [];
          }
          if (!Array.isArray(fetchedData)) fetchedData = [];

          // توحيد أسماء البيانات
          const normalizedData = fetchedData.map(item => ({
            ...item,
            image: item.imageUrl || item.image,
            stock: item.stockQuantity !== undefined ? item.stockQuantity : item.stock,
            package: item.packageType || item.package,
            datasheet: item.datasheetUrl || item.datasheet
          }));

          setComponents(normalizedData);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error fetching data:", err);
          setError("Failed to load components");
          setIsLoading(false);
        });
    }
  }, []);

  const featuredComponents = components.slice(0, 4);

  const dynamicCategories = useMemo(() => {
    const uniqueCategories = new Set(components.map(item => item.category).filter(Boolean));
    return ['All Categories', ...Array.from(uniqueCategories)];
  }, [components]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/store', { 
      state: { 
        initialSearch: searchQuery,
        initialCategory: searchCategory === 'All Categories' ? 'All' : searchCategory
      } 
    }); 
  };

  const features = [
    { title: "Project Generator", desc: "Generate full component lists and step-by-step guides using AI.", icon: Wand2, link: "/project-generator", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30 hover:border-cyan-500/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]", action: "Try Generator" },
    { title: "Smart Alternatives", desc: "Out of stock? Find the perfect alternative component based on specs.", icon: Cpu, link: "/store", state: { highlightMoreDetails: true }, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30 hover:border-emerald-500/80 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]", action: "Find Alternatives" },
    { title: "Logic Simulator", desc: "Build and test digital logic circuits in real-time.", icon: CircuitBoard, link: "/logic", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30 hover:border-amber-500/80 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]", action: "Launch Simulator" }
  ];

  return (
    <div className="min-h-screen bg-[url('/images/bg-circuit.jpg')] bg-cover bg-fixed bg-center relative font-sans text-gray-200">
      <div className="absolute inset-0 bg-[#070b14]/80 z-0"></div>

      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        <Header />

        <style>{`
          @keyframes floatUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
          .fade-up { animation: floatUp .6s cubic-bezier(.16,1,.3,1) both; }
        `}</style>

        <div className="flex-1 overflow-y-auto px-6 pb-20 pt-24 sm:px-10 scroll-smooth">
          <div className="max-w-[1200px] mx-auto">
            
            {/* HERO SECTION */}
            <div className="flex flex-col items-center text-center mt-12 mb-24">
              <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/20 px-5 py-2 text-xs font-bold tracking-widest text-blue-400 uppercase">
                ⚡ Welcome to CircuitCore
              </div>
              
              <h1 className="fade-up text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight" style={{ animationDelay: "100ms" }}>
                Your All-in-One <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Electronics Platform</span>
              </h1>
              
              <p className="fade-up max-w-2xl text-base md:text-lg text-gray-400 mb-10 leading-relaxed" style={{ animationDelay: "200ms" }}>
                Find datasheets, discover components, generate project requirements using AI, and buy everything you need — all in one unified workspace.
              </p>

              <form onSubmit={handleSearch} className="fade-up w-full max-w-3xl flex items-center bg-[#0d1323]/90 backdrop-blur-xl border border-gray-700/60 rounded-full p-2 shadow-2xl" style={{ animationDelay: "300ms" }}>
                <div className="pl-5 pr-2 text-gray-400"><Search size={22} /></div>
                <input 
                  type="text" 
                  placeholder="Search components, part numbers or datasheets..." 
                  className="flex-1 bg-transparent text-white text-sm md:text-base focus:outline-none placeholder-gray-500 py-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <div className="hidden sm:block border-l border-gray-700/60 px-4">
                  <select 
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="bg-transparent text-gray-400 text-sm focus:outline-none cursor-pointer py-1 max-w-[150px]"
                  >
                    {dynamicCategories.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#0d1323]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] active:scale-95">
                  Search
                </button>
              </form>
            </div>

            {/* FEATURES CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-32 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  onClick={() => navigate(feature.link, feature.state ? { state: feature.state } : {})}
                  className={`fade-up cursor-pointer group bg-[#0d1323]/60 backdrop-blur-md p-6 rounded-3xl border transition-all duration-300 flex flex-col h-full ${feature.border}`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.bg} ${feature.color}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">{feature.desc}</p>
                  <div className={`flex items-center gap-2 text-sm font-bold mt-auto ${feature.color} group-hover:gap-3 transition-all`}>
                    {feature.action} <ArrowRight size={16} />
                  </div>
                </div>
              ))}
            </div>

            {/* FEATURED COMPONENTS */}
            <div className="fade-up mb-32" style={{ animationDelay: "200ms" }}>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-wide mb-2">Featured Components</h2>
                  <p className="text-gray-400 text-sm">Top picks from our massive components library.</p>
                </div>
                <button onClick={() => navigate('/store')} className="hidden sm:flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
                  Explore Store <ArrowRight size={18} />
                </button>
              </div>

              {/*  معالجة حالة التحميل أو الأخطاء في هذا الجزء فقط */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16 text-blue-500">
                  <Loader2 size={36} className="animate-spin mb-4" />
                  <p className="text-gray-400 text-sm">Loading featured items...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-16 text-red-500 border border-red-900/30 bg-red-900/10 rounded-2xl">
                  <p className="text-sm mb-2">{error}</p>
                  <button onClick={() => window.location.reload()} className="text-xs text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500">Retry</button>
                </div>
              ) : featuredComponents.length === 0 ? (
                <div className="text-center py-16 text-gray-500 border border-gray-800/60 rounded-2xl">
                  No featured components found.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {featuredComponents.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => navigate(`/product/${item.id}`)} 
                      className="cursor-pointer bg-[#0d1323]/60 backdrop-blur-md p-5 rounded-2xl border border-gray-800/60 hover:border-gray-500 transition-all flex flex-col group hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    >
                      <div className="bg-white rounded-xl h-32 mb-4 p-2 flex items-center justify-center relative overflow-hidden shadow-inner">
                         <img src={item.image} alt={item.name} className={`max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ${item.stock === 0 && 'grayscale opacity-50'}`} />
                      </div>
                      <h4 className="font-bold text-white text-sm line-clamp-1 mb-1 group-hover:text-blue-400 transition-colors">{item.name}</h4>
                      <p className="text-xs text-gray-500 mb-4 line-clamp-2 h-8">{item.description}</p>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800/60">
                        <span className="font-extrabold text-white">EGP {parseFloat(item.price || 0).toFixed(2)}</span>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if (item.stock > 0) addItem(item); 
                          }} 
                          disabled={item.stock === 0}
                          className={`${item.stock > 0 ? 'text-blue-500 hover:text-white hover:bg-blue-600 bg-blue-900/20 cursor-pointer' : 'text-gray-500 bg-gray-800 cursor-not-allowed'} p-2 rounded-lg transition-colors`}
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* HOW IT WORKS */}
            <div className="fade-up mb-24 bg-[#0d1323]/40 backdrop-blur-xl border border-gray-800/60 rounded-3xl p-10" style={{ animationDelay: "300ms" }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-white tracking-wide mb-4">How CircuitCore Works?</h2>
                <p className="text-gray-400">From idea to hardware in three simple steps.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-blue-900 via-cyan-900 to-emerald-900 -z-10"></div>
                
                <div className="text-center bg-[#070b14] border border-gray-800/80 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                  <div className="w-14 h-14 bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-800/50 text-xl font-black shadow-[0_0_15px_rgba(59,130,246,0.3)]">1</div>
                  <h4 className="text-white font-bold mb-2">Design & Generate</h4>
                  <p className="text-sm text-gray-500">Use our AI generator or logic simulator to design your perfect circuit.</p>
                </div>
                
                <div className="text-center bg-[#070b14] border border-gray-800/80 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                  <div className="w-14 h-14 bg-cyan-900/30 text-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-800/50 text-xl font-black shadow-[0_0_15px_rgba(6,182,212,0.3)]">2</div>
                  <h4 className="text-white font-bold mb-2">Find Components</h4>
                  <p className="text-sm text-gray-500">Read datasheets, compare specs, and find the smartest alternatives instantly.</p>
                </div>
                
                <div className="text-center bg-[#070b14] border border-gray-800/80 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
                  <div className="w-14 h-14 bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-800/50 text-xl font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">3</div>
                  <h4 className="text-white font-bold mb-2">Build It</h4>
                  <p className="text-sm text-gray-500">Add everything to cart, checkout seamlessly, and start building your project.</p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <footer className="fade-up border-t border-gray-800/60 pt-10 pb-6 text-center" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center justify-center gap-2 mb-6 opacity-70 grayscale">
                <img src="/images/logo.png" alt="Logo" className="h-6" />
                <img src="/images/name.png" alt="CircuitCore" className="h-5" />
              </div>
              <div className="flex justify-center gap-6 text-sm font-medium text-gray-500 mb-6">
                <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Contact Support</a>
              </div>
              <p className="text-xs text-gray-600 flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500/70" /> © 2026 CircuitCore. All rights reserved. Designed for Engineers.
              </p>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
}