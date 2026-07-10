import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import componentsData from '../data/components.json';
import { useCart } from '../CartContext';
import Header from './Header'; 
import { ArrowLeft, ZoomIn, ChevronRight, Plus, Minus, Cpu, Activity, X, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config'; // 🌟 استدعاء اللينك المركزي

const ProductPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false); 

  // ================= جلب بيانات المنتج والبدائل =================
  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        if (!API_BASE_URL) {
          // 1. القراءة من الملف المحلي (components.json)
          const localProduct = componentsData.find(item => item.id.toString() === id);
          if (localProduct) {
            // جلب بدائل وهمية من نفس القسم
            const localAlts = componentsData
              .filter(item => item.category === localProduct.category && item.id.toString() !== id)
              .slice(0, 3);
              
            setProduct({ ...localProduct, alternatives: localAlts });
          } else {
            setProduct(null);
          }
          setIsLoading(false);
        } else {
          // 2. القراءة من الباك إند (API)
          const prodRes = await fetch(`${API_BASE_URL}/components/${id}`);
          if (!prodRes.ok) throw new Error('Product not found');
          const prodJson = await prodRes.json();
          let productData = prodJson.data || prodJson;

          // جلب البدائل من الباك إند
          let alternativesData = [];
          try {
            const altsRes = await fetch(`${API_BASE_URL}/components/${id}/alternatives`);
            if (altsRes.ok) {
              const altsJson = await altsRes.json();
              let rawAlts = altsJson.data || altsJson;
              if (rawAlts && typeof rawAlts === 'object' && !Array.isArray(rawAlts)) {
                 rawAlts = rawAlts.items || rawAlts.components || rawAlts.data || [];
              }
              if (!Array.isArray(rawAlts)) rawAlts = [];
              alternativesData = rawAlts;
            }
          } catch (e) {
            console.warn("Alternatives couldn't be loaded", e);
          }

          // توحيد أسماء البيانات عشان الديزاين (التعديل السحري هنا 👇)
          const normalizedProduct = {
            ...productData,
            image: productData.imageUrl || productData.image,
            stock: productData.stockQuantity !== undefined ? productData.stockQuantity : productData.stock,
            package: productData.packageType || productData.package,
            datasheet: productData.datasheetUrl || productData.datasheet,
            
            // 🌟 سحب التفاصيل من جوه الـ specs لو موجودة، أو من بره لو بنقرأ من اللوكال 🌟
            features: productData.specs?.features || productData.features || [],
            applications: productData.specs?.applications || productData.applications || [],
            
            alternatives: alternativesData
          };

          setProduct(normalizedProduct);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);
  // ==============================================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center text-blue-500">
        <Loader2 size={48} className="animate-spin mb-4" />
        <h2 className="text-xl font-bold text-white tracking-widest animate-pulse">Loading Details...</h2>
      </div>
    );
  }

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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
              
              {/* 1. عمود الصورة */}
              <div className="fade-up lg:col-span-4" style={{ animationDelay: "50ms" }}>
                <div className="bg-white rounded-xl aspect-square flex items-center justify-center relative overflow-hidden p-6 shadow-md">
                  <img 
                    src={product.image || "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=500&q=80"} 
                    alt={product.name} 
                    className={`w-4/5 h-4/5 object-contain ${product.stock === 0 && 'grayscale opacity-50'}`} 
                  />
                  <button 
                    onClick={() => setIsZoomed(true)} 
                    className="absolute bottom-4 right-4 bg-[#2b2d31] hover:bg-gray-800 text-gray-300 p-2.5 rounded-lg transition-all shadow-lg"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
              </div>

              {/* 2. عمود البيانات التقنية */}
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
                  EGP {parseFloat(product.price || 0).toFixed(2)}
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
                    className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all h-12 flex items-center justify-center ${product.stock > 0 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] active:scale-95' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                  </button>
                </div>

                {/* 🌟 المميزات والتطبيقات بعد التعديل 🌟 */}
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
                
                {product.datasheet && (
                  <a href={product.datasheet} target="_blank" rel="noopener noreferrer" className="w-full bg-transparent hover:bg-blue-600/10 text-blue-400 border border-blue-500/30 font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md h-12 mt-auto">
                    <span>View Full Datasheet Blueprint</span>
                  </a>
                )}
              </div>

              {/* 3. عمود البدائل النصية */}
              <div className="fade-up lg:col-span-3 flex flex-col gap-4" style={{ animationDelay: "150ms" }}>
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 border-b border-gray-800/60 pb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Alternatives & Suggested
                </div>
                
                {product.alternatives && product.alternatives.length > 0 ? (
                  product.alternatives.map((alt, index) => (
                    <div 
                      key={index}
                      onClick={() => navigate(`/product/${alt.id}`)}
                      className="bg-[#0d1323]/40 border border-gray-800/50 hover:border-gray-600 hover:bg-[#0d1323]/80 rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <div className="flex flex-col">
                        <h3 className="text-white text-sm font-bold group-hover:text-blue-400 transition-colors line-clamp-1" title={alt.name}>{alt.name}</h3>
                        {alt.price && (
                          <div className="text-gray-500 text-xs mt-1">EGP {parseFloat(alt.price).toFixed(2)}</div>
                        )}
                      </div>
                      <button className="text-gray-600 group-hover:text-white transition-colors shrink-0 ml-2">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 border border-gray-800/40 rounded-xl opacity-60">
                    <p className="text-xs text-gray-500">No alternatives found.</p>
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