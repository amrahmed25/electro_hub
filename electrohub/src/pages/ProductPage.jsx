import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import componentsData from '../data/components.json';
import { useCart } from '../CartContext';
import Header from './Header'; 
import { ArrowLeft, ZoomIn, ChevronRight, Plus, Minus, Cpu, Activity, X } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false); 

  const product = componentsData.find(item => item.id.toString() === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold">Product not found!</h2>
          <button onClick={() => navigate('/store')} className="mt-4 text-blue-400 font-bold hover:underline">Back to Store</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1); 
  };

  return (
    <div className="min-h-screen bg-[url('/images/bg-circuit.jpg')] bg-cover bg-fixed bg-center relative font-sans text-gray-200 select-none">
      <div className="absolute inset-0 bg-[#06101e]/80 z-0"></div>

      {/* ================= نافذة الزوم الكبيرة (Lightbox) ================= */}
      {isZoomed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm fade-up">
          <button 
            onClick={() => setIsZoomed(false)} 
            className="absolute top-8 right-8 text-gray-400 hover:text-white p-2 transition-colors cursor-pointer"
          >
            <X size={36} />
          </button>
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl" 
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        
        <Header />

        <style>{`
          @keyframes floatUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
          .fade-up { animation: floatUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        `}</style>

        <div className="flex-1 overflow-y-auto p-6 mt-16">
          <div className="max-w-[1400px] mx-auto mt-4">
            
            <div 
              onClick={() => navigate('/store')} 
              className="fade-up inline-flex items-center gap-2 text-gray-400 text-sm hover:text-blue-400 cursor-pointer mb-8 transition-all group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Components</span>
            </div>

            {/* التقسيمة المظبوطة (4 للصورة - 5 للبيانات - 3 للبدائل) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
              
              {/* 1. عمود الصورة (رجعناه 4 عواميد عشان يرجع لحجمه الملموم) */}
              <div className="fade-up lg:col-span-4" style={{ animationDelay: "50ms" }}>
                <div className="bg-white rounded-xl aspect-square flex items-center justify-center relative overflow-hidden p-6 shadow-md">
                  <img 
                    src={product.image || "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=500&q=80"} 
                    alt={product.name} 
                    className="w-4/5 h-4/5 object-contain" 
                  />
                  <button 
                    onClick={() => setIsZoomed(true)} 
                    className="absolute bottom-4 right-4 bg-[#2b2d31] hover:bg-gray-800 text-gray-300 p-2.5 rounded-lg transition-all"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
              </div>

              {/* 2. عمود البيانات التقنية (5 عواميد) */}
              <div className="fade-up lg:col-span-5 flex flex-col" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-black tracking-wide text-white">
                    {product.name}
                  </h1>
                  
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md tracking-wider uppercase ${product.stock > 0 ? 'bg-[#0a2e22] border border-[#135a43] text-emerald-400' : 'bg-red-950 border border-red-800 text-red-400'}`}>
                    {product.stock > 0 ? `IN STOCK: ${product.stock}` : 'OUT OF STOCK'}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-6 font-light">
                  {product.description}
                </p>

                <div className="text-3xl font-extrabold tracking-tight text-white mb-6">
                  EGP {product.price.toFixed(2)}
                </div>

                <div className="flex items-center gap-3 mb-8 w-full border-b border-gray-800/60 pb-8">
                  <div className={`flex items-center bg-[#070b14] border border-gray-800 rounded-xl overflow-hidden h-12 w-28 shrink-0 ${product.stock === 0 && 'opacity-50 pointer-events-none'}`}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 text-gray-500 hover:text-white transition-colors h-full flex items-center"><Minus size={14} /></button>
                    <span className="w-full text-center bg-transparent text-white text-sm font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 text-gray-500 hover:text-white transition-colors h-full flex items-center"><Plus size={14} /></button>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all h-12 flex items-center justify-center ${product.stock > 0 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg active:scale-95' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                  </button>
                </div>

                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Cpu size={14} className="text-blue-400" />
                      Key Features
                    </h3>
                    <ul className="space-y-2 text-xs font-medium text-gray-400 pl-1">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1"></span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.applications && product.applications.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Activity size={14} className="text-cyan-400" />
                      Applications
                    </h3>
                    <ul className="space-y-2 text-xs font-medium text-gray-400 pl-1">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1"></span>
                          <span className="leading-relaxed">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 3. عمود البدائل النصية (3 عواميد) */}
              <div className="fade-up lg:col-span-3 flex flex-col gap-4" style={{ animationDelay: "150ms" }}>
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 border-b border-gray-800/60 pb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Alternatives & Suggested
                </div>
                
                {product.alternatives && product.alternatives.length > 0 ? (
                  product.alternatives.map((alt, index) => (
                    <div 
                      key={index} 
                      className="bg-transparent border border-gray-800/50 hover:border-gray-600 rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <div className="flex flex-col">
                        <h3 className="text-white text-sm font-bold group-hover:text-blue-400 transition-colors">{alt.name}</h3>
                        {alt.price && (
                          <div className="text-gray-500 text-xs mt-1">EGP {parseFloat(alt.price).toFixed(2)}</div>
                        )}
                      </div>
                      <button className="text-gray-600 group-hover:text-white transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 border border-gray-800/40 rounded-xl opacity-60">
                    <p className="text-xs text-gray-500">No alternatives registered.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;