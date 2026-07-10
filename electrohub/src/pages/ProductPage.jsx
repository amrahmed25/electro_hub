import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import Header from './Header'; 
import { ArrowLeft, ZoomIn, ChevronRight, Plus, Minus, Cpu, Activity, X, Loader2 } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false); 

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const prodRes = await fetch(`https://electrohub-pi4ayssj.b4a.run/components/${id}`);
        if (!prodRes.ok) throw new Error('Product not found');
        const prodJson = await prodRes.json();
        
        let productData = prodJson.data || prodJson;

        let alternativesData = [];
        try {
          const altsRes = await fetch(`https://electrohub-pi4ayssj.b4a.run/components/${id}/alternatives`);
          if (altsRes.ok) {
            const altsJson = await altsRes.json();
            
            // حماية لنفس قصة الـ Array
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

        setProduct({ ...productData, alternatives: alternativesData });
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

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
    if (product.stockQuantity === 0) return;
    
    const normalizedProduct = {
      ...product,
      image: product.imageUrl,
      stock: product.stockQuantity,
      price: product.price,
      package: product.packageType
    };

    for (let i = 0; i < quantity; i++) addItem(normalizedProduct);
    setQuantity(1); 
  };

  return (
    <div className="min-h-screen bg-[url('/images/bg-circuit.jpg')] bg-cover bg-fixed bg-center relative font-sans text-gray-200 select-none">
      <div className="absolute inset-0 bg-[#06101e]/80 z-0"></div>

      {isZoomed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm fade-up">
          <button onClick={() => setIsZoomed(false)} className="absolute top-8 right-8 text-gray-400 hover:text-white p-2 transition-colors cursor-pointer">
            <X size={36} />
          </button>
          <img src={product.imageUrl} alt={product.name} className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl" />
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
            
            <div onClick={() => navigate('/store')} className="fade-up inline-flex items-center gap-2 text-gray-400 text-sm hover:text-blue-400 cursor-pointer mb-8 transition-all group">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Components</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
              
              <div className="fade-up lg:col-span-4" style={{ animationDelay: "50ms" }}>
                <div className="bg-white rounded-xl aspect-square flex items-center justify-center relative overflow-hidden p-6 shadow-md">
                  <img src={product.imageUrl || "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=500&q=80"} alt={product.name} className="w-4/5 h-4/5 object-contain" />
                  <button onClick={() => setIsZoomed(true)} className="absolute bottom-4 right-4 bg-[#2b2d31] hover:bg-gray-800 text-gray-300 p-2.5 rounded-lg transition-all">
                    <ZoomIn size={20} />
                  </button>
                </div>
              </div>

              <div className="fade-up lg:col-span-5 flex flex-col" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-black tracking-wide text-white">{product.name}</h1>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md tracking-wider uppercase ${product.stockQuantity > 0 ? 'bg-[#0a2e22] border border-[#135a43] text-emerald-400' : 'bg-red-950 border border-red-800 text-red-400'}`}>
                    {product.stockQuantity > 0 ? `IN STOCK: ${product.stockQuantity}` : 'OUT OF STOCK'}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-6 font-light">{product.description}</p>
                <div className="text-3xl font-extrabold tracking-tight text-white mb-6">EGP {parseFloat(product.price || 0).toFixed(2)}</div>

                <div className="flex items-center gap-3 mb-8 w-full border-b border-gray-800/60 pb-8">
                  <div className={`flex items-center bg-[#070b14] border border-gray-800 rounded-xl overflow-hidden h-12 w-28 shrink-0 ${!product.stockQuantity && 'opacity-50 pointer-events-none'}`}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 text-gray-500 hover:text-white transition-colors h-full flex items-center"><Minus size={14} /></button>
                    <span className="w-full text-center bg-transparent text-white text-sm font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))} className="px-3 text-gray-500 hover:text-white transition-colors h-full flex items-center"><Plus size={14} /></button>
                  </div>
                  <button onClick={handleAddToCart} disabled={!product.stockQuantity} className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all h-12 flex items-center justify-center ${product.stockQuantity > 0 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg active:scale-95' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
                    {product.stockQuantity > 0 ? 'Add to Cart' : 'Sold Out'}
                  </button>
                </div>

                {product.specs?.features && product.specs.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Cpu size={14} className="text-blue-400" />
                      Key Features
                    </h3>
                    <ul className="space-y-2 text-xs font-medium text-gray-400 pl-1">
                      {product.specs.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1"></span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.specs?.applications && product.specs.applications.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Activity size={14} className="text-cyan-400" />
                      Applications
                    </h3>
                    <ul className="space-y-2 text-xs font-medium text-gray-400 pl-1">
                      {product.specs.applications.map((app, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1"></span>
                          <span className="leading-relaxed">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {product.datasheetUrl && (
                  <a href={product.datasheetUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-transparent hover:bg-blue-600/10 text-blue-400 border border-blue-500/30 font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md h-12 mt-auto">
                    <span>View Full Datasheet Blueprint</span>
                  </a>
                )}
              </div>

              <div className="fade-up lg:col-span-3 flex flex-col gap-4" style={{ animationDelay: "150ms" }}>                
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 border-b border-gray-800/60 pb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Alternatives & Suggested
                </div>
                
                {product.alternatives && product.alternatives.length > 0 ? (
                  product.alternatives.map((alt, index) => (
                    <div onClick={() => navigate(`/product/${alt.id}`)} key={index} className="bg-transparent border border-gray-800/50 hover:border-gray-600 rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer group">
                      <div className="flex flex-col">
                        <h3 className="text-white text-sm font-bold group-hover:text-blue-400 transition-colors">{alt.name}</h3>
                        {alt.price && <div className="text-gray-500 text-xs mt-1">EGP {parseFloat(alt.price).toFixed(2)}</div>}
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