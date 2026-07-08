import { useState, useMemo } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Search, ShoppingCart, ChevronRight, FileText, ExternalLink, Minus, Plus } from 'lucide-react';
// استيراد الداتا المحلية اللي فيها أسعار السوق المصري
import componentsData from '../data/components.json';

// استدعاء الهيدر باسم الملف الجديد
import Header from './modified_header'; 

export default function Store() {
  const [components, setComponents] = useState(componentsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  
  const [cartCount, setCartCount] = useState(0);
  const [quantities, setQuantities] = useState({});

  // استخراج كل الأقسام الموجودة في الداتا بشكل ديناميكي (بدون تكرار)
  const categories = useMemo(() => {
    const uniqueCategories = new Set(components.map(item => item.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [components]);

  // دالة الفلترة (بحث + أقسام)
  const filteredComponents = components.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleQuantityChange = (id, delta, maxStock) => {
    setQuantities(prev => {
      const currentQty = prev[id] || 1;
      let newQty = currentQty + delta;
      
      if (newQty < 1) newQty = 1;
      if (newQty > maxStock) newQty = maxStock;
      
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (id, stock) => {
    if (stock === 0) return; 
    const qtyToAdd = quantities[id] || 1;
    setCartCount(prev => prev + qtyToAdd);
    setQuantities(prev => ({ ...prev, [id]: 1 })); 
  };

  return (
    <div className="min-h-screen bg-[url('/images/bg-circuit.jpg')] bg-cover bg-fixed bg-center relative font-sans text-gray-200">
      <div className="absolute inset-0 bg-[#070b14]/50 z-0"></div>

      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        
        {/* ================= Navbar ================= */}
        {/* استدعاء المكون الجديد وتمرير عداد السلة له */}
        <Header cartCount={cartCount} />

        {/* ================= Store Content ================= */}
        {/* mt-16 لضمان عدم تداخل المحتوى مع الهيدر الثابت أعلى الشاشة */}
        <div className="flex-1 overflow-y-auto p-6 mt-16">
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-10 mt-4 flex items-center bg-[#0d1323]/80 backdrop-blur-md border border-gray-700/50 rounded-full p-1.5 shadow-2xl">
            <div className="pl-4 pr-2 text-gray-400"><Search size={20} /></div>
            <input 
              type="text" 
              placeholder="Search components, part numbers or datasheets..." 
              className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              Search
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-1/4 bg-[#0d1323]/60 backdrop-blur-md p-6 rounded-2xl border border-gray-800/60 shadow-2xl flex flex-col gap-6 lg:sticky lg:top-6 h-fit">
              <div>
                <h2 className="text-[11px] font-extrabold tracking-widest text-gray-400 mb-4 uppercase">Filters & Categories</h2>
                <ul className="space-y-3 text-xs font-medium text-gray-300">
                  {categories.map((category) => (
                    <li 
                      key={category}
                      onClick={() => setSelectedCategory(category)} 
                      className={`cursor-pointer hover:text-blue-500 transition-colors flex items-center gap-2 ${
                        selectedCategory === category ? 'text-blue-400 font-bold' : ''
                      } ${category !== 'All' ? 'pl-2' : ''}`}
                    >
                      {category !== 'All' && (
                        <ChevronRight 
                          size={12} 
                          className={selectedCategory === category ? 'text-blue-400' : 'text-gray-600'} 
                        />
                      )}
                      {category === 'All' ? 'All Components' : category}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Grid */}
            <main className="w-full lg:w-3/4">
              <h2 className="text-lg font-bold mb-6 text-white tracking-wide">
                Browsing: {selectedCategory === 'All' ? 'All Components' : selectedCategory} ({filteredComponents.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredComponents.map((item) => (
                  <div key={item.id} className={`bg-[#0d1323]/60 backdrop-blur-md p-5 rounded-2xl border ${item.stock === 0 ? 'border-red-900/40 opacity-80' : 'border-gray-800/60 hover:border-blue-600/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.05)]'} transition-all duration-300 flex flex-col group`}>
                    
                    <div className="bg-white rounded-xl h-32 mb-5 p-2 flex items-center justify-center overflow-hidden relative shadow-inner">
                       <img src={item.image} alt={item.name} className={`max-h-full max-w-full object-contain mix-blend-multiply ${item.stock > 0 && 'group-hover:scale-105'} transition-transform duration-500 ${item.stock === 0 && 'grayscale opacity-50'}`} />
                       <span className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm text-[9px] font-mono text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">{item.package}</span>
                    </div>
                    
                    <div className="flex justify-between items-start mb-1.5 gap-2">
                      <h3 className="text-base font-bold text-white leading-tight truncate" title={item.name}>{item.name}</h3>
                      <span className="text-[9px] bg-blue-900/30 text-blue-400 border border-blue-800/50 px-2 py-0.5 rounded-md font-bold shrink-0 tracking-wider uppercase">
                        {item.manufacturer.substring(0,6)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-6 h-8 line-clamp-2 leading-relaxed" title={item.description}>{item.description}</p>
                    
                    <div className="grid grid-cols-2 gap-1 border-b border-gray-800/60 pb-4 mb-4 text-center">
                      <a 
                        href={item.datasheet} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex flex-col items-center gap-1.5 text-[10px] font-medium text-gray-500 hover:text-blue-400 transition-colors group/btn cursor-pointer"
                      >
                        <FileText size={14} /> <span className="whitespace-nowrap">Datasheet</span>
                      </a>
                      <button 
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="flex flex-col items-center gap-1.5 text-[10px] font-medium text-gray-500 hover:text-blue-400 transition-colors group/btn"
                      >
                        <ExternalLink size={14} /> <span className="whitespace-nowrap">More Details</span>
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end mb-5">
                      <div>
                        <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Unit Price</p>
                        <p className="text-xl font-extrabold text-white">EGP {item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Availability</p>
                        {item.stock > 0 ? (
                          <p className="text-xs font-bold text-emerald-400">In Stock: {item.stock}</p>
                        ) : (
                          <p className="text-xs font-bold text-red-500">Out of Stock</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2.5 mt-auto">
                      <div className={`flex items-center bg-[#070b14] border border-gray-800 rounded-xl overflow-hidden h-10 w-24 shrink-0 ${item.stock === 0 && 'opacity-50 pointer-events-none'}`}>
                        <button onClick={() => handleQuantityChange(item.id, -1, item.stock)} className="px-2.5 text-gray-500 hover:text-white hover:bg-gray-800 transition-colors h-full flex items-center"><Minus size={12} /></button>
                        <input type="text" value={quantities[item.id] || 1} readOnly className="w-full text-center bg-transparent text-white text-xs font-bold focus:outline-none h-full" />
                        <button onClick={() => handleQuantityChange(item.id, 1, item.stock)} className="px-2.5 text-gray-500 hover:text-white hover:bg-gray-800 transition-colors h-full flex items-center"><Plus size={12} /></button>
                      </div>
                      <button 
                        onClick={() => handleAddToCart(item.id, item.stock)} 
                        disabled={item.stock === 0}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all h-10 flex items-center justify-center ${item.stock > 0 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)] active:scale-95' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                      >
                        {item.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </main>

          </div>
        </div>
      </div>
    </div>
  );
}