import { useNavigate, NavLink } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';

export default function Header({ cartCount = 0 }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#06101e]/80 backdrop-blur-md border-b border-gray-800/50 text-white select-none">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8 h-16">
        
        {/* اللوجو */}
        <div onClick={() => navigate('/home')} className="flex items-center gap-0 cursor-pointer group flex-shrink-0">
          <img src="/images/logo.png" alt="CircuitCore" className="h-8 w-auto object-contain group-hover:rotate-12 transition-transform duration-300" />
          <img src="/images/name.png" alt="CircuitCore Text" className="h-8 w-auto object-contain mt-1 hidden sm:block" />
        </div>

        {/* الروابط متظبطة بـ NavLink مع تأثير الإضاءة النيون الأصلي */}
        <div className="hidden xl:flex items-center gap-7 text-[14px] font-medium">
          <NavLink 
            to="/home" 
            className={({ isActive }) => isActive 
              ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" 
              : "relative text-gray-400 hover:text-white transition-colors pb-1"
            }
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/store" 
            className={({ isActive }) => isActive 
              ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" 
              : "relative text-gray-400 hover:text-white transition-colors pb-1"
            }
          >
            Components Library
          </NavLink>
          
          <NavLink 
            to="/datasheets" 
            className={({ isActive }) => isActive 
              ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" 
              : "relative text-gray-400 hover:text-white transition-colors pb-1"
            }
          >
            Datasheet Library
          </NavLink>
          
          <NavLink 
            to="/logic" 
            className={({ isActive }) => isActive 
              ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" 
              : "relative text-gray-400 hover:text-white transition-colors pb-1"
            }
          >
            Logic Simulator
          </NavLink>
          
          <NavLink 
            to="/project-generator" 
            className={({ isActive }) => isActive 
              ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" 
              : "relative text-gray-400 hover:text-white transition-colors pb-1"
            }
          >
            Project Generator
          </NavLink>
          
          <NavLink 
            to="/shopping-cart" 
            className={({ isActive }) => isActive 
              ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" 
              : "relative text-gray-400 hover:text-white transition-colors pb-1"
            }
          >
            Shopping Cart
          </NavLink>
          
          <NavLink 
            to="/user-dashboard" 
            className={({ isActive }) => isActive 
              ? "relative text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pb-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:shadow-[0_0_10px_rgba(96,165,250,1)]" 
              : "relative text-gray-400 hover:text-white transition-colors pb-1"
            }
          >
            User Dashboard
          </NavLink>
        </div>

        {/* الأيقونات اليمين مع عداد السلة */}
        <div className="flex items-center gap-6 text-gray-400">
          <button className="hover:text-white transition-colors"><Search size={18} /></button>
          <button onClick={() => navigate('/shopping-cart')} className="hover:text-white transition-colors relative">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[10px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                {cartCount}
              </span>
            )}
          </button>
          <div onClick={() => navigate('/user-dashboard')} className="h-8 w-8 rounded-full overflow-hidden cursor-pointer border border-transparent hover:border-gray-500 transition-colors">
            <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </nav>
  );
}