import { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, Settings, LogOut, X, Trash2, ArrowRight } from 'lucide-react'; 
import { useCart } from '../CartContext'; 

export default function Header() {
  const navigate = useNavigate();
  const { items, removeItem } = useCart();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  
  const dropdownRef = useRef(null);

  const cartCount = (items || []).reduce((count, item) => count + (item.quantity || 1), 0);
  const cartTotal = (items || []).reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#06101e]/80 backdrop-blur-md border-b border-gray-800/50 text-white select-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8 h-16">
          
          <div onClick={() => navigate('/home')} className="flex items-center gap-0 cursor-pointer group flex-shrink-0">
            <img src="/images/logo.png" alt="CircuitCore" className="h-8 w-auto object-contain group-hover:rotate-12 transition-transform duration-300" />
            <img src="/images/name.png" alt="CircuitCore Text" className="h-8 w-auto object-contain mt-1 hidden sm:block" />
          </div>

          <div className="hidden xl:flex items-center gap-9 text-[14px] font-medium">
            <NavLink to="/home" className={({ isActive }) => isActive ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" : "relative text-gray-400 hover:text-white transition-colors pb-1"}>Home</NavLink>
            <NavLink to="/store" className={({ isActive }) => isActive ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" : "relative text-gray-400 hover:text-white transition-colors pb-1"}>Components Library</NavLink>
            <NavLink to="/logic" className={({ isActive }) => isActive ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" : "relative text-gray-400 hover:text-white transition-colors pb-1"}>Logic Simulator</NavLink>
            <NavLink to="/project-generator" className={({ isActive }) => isActive ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" : "relative text-gray-400 hover:text-white transition-colors pb-1"}>Project Generator</NavLink>
            <NavLink to="/shopping-cart" className={({ isActive }) => isActive ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" : "relative text-gray-400 hover:text-white transition-colors pb-1"}>Shopping Cart</NavLink>
            <NavLink to="/user-dashboard" className={({ isActive }) => isActive ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" : "relative text-gray-400 hover:text-white transition-colors pb-1"}>User Dashboard</NavLink>
          </div>

          <div className="flex items-center gap-6 text-gray-400">
            
            <button onClick={() => setIsCartOpen(true)} className="hover:text-white transition-colors relative">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[10px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>
            
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className={`h-8 w-8 rounded-full overflow-hidden cursor-pointer border transition-all ${isDropdownOpen ? 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]' : 'border-transparent hover:border-blue-500'}`}
              >
                <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0a0f1c]/95 backdrop-blur-md border border-gray-800/80 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] origin-top-right transition-all duration-200 z-[60]">
                  <div className="px-3 py-2.5 border-b border-gray-800/50 mb-1.5">
                    <p className="text-xs font-bold text-white truncate">Eng. Mohamed</p>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5 truncate">mohamed.dev@electrohub.com</p>
                  </div>

                  <button onClick={() => { navigate('/user-dashboard'); setIsDropdownOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all group">
                    <LayoutDashboard size={14} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                    <span className="font-medium">My Dashboard</span>
                  </button>

                  <button onClick={() => { navigate('/user-dashboard'); setIsDropdownOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-gray-800/40 rounded-xl transition-all group">
                    <Settings size={14} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                    <span className="font-medium">Account Settings</span>
                  </button>

                  <div className="border-t border-gray-800/50 mt-1.5 pt-1.5">
                    <button onClick={() => { setIsDropdownOpen(false); navigate('/'); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300" 
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0f1c] border-l border-gray-800/80 z-[110] transform transition-transform duration-300 ease-out flex flex-col shadow-2xl ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-gray-800/60 flex justify-between items-center bg-[#0d1323]">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-blue-500" size={20} />
            <h2 className="text-lg font-bold text-white tracking-wide">Quick Cart</h2>
            <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full">{cartCount} Items</span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {(!items || items.length === 0) ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-70">
              <ShoppingCart size={48} className="mb-4" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-[#0d1323]/50 p-3 rounded-xl border border-gray-800/50 group">
                <div className="w-16 h-16 bg-white rounded-lg p-1 shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-white leading-tight line-clamp-1">{item.name}</h4>
                    <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500 transition-colors shrink-0 ml-2">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-xs font-bold text-gray-400">Qty: {item.quantity}</span>
                    <span className="text-sm font-extrabold text-blue-400">EGP {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items && items.length > 0 && (
          <div className="p-5 border-t border-gray-800/60 bg-[#0d1323]">
            <div className="flex justify-between items-center mb-5">
              <span className="text-sm font-medium text-gray-400">Subtotal</span>
              <span className="text-2xl font-extrabold text-white">EGP {cartTotal.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={() => { 
                setIsCartOpen(false); 
                navigate('/shopping-cart'); 
              }} 
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-colors active:scale-95"
            >
              View Full Cart <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}