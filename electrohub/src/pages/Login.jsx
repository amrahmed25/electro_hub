import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ArrowRight } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // لو بيعمل تسجيل دخول، انقله فوراً لصفحة المتجر
      navigate('/store');
    } else {
      // لو بيعمل حساب جديد
      alert("تم إنشاء الحساب بنجاح! يلا سجل دخول.");
      setIsLogin(true); // نرجعه لشاشة تسجيل الدخول
    }
  };

  return (
    // نفس الخلفية بتاعة المتجر بالظبط مع ثباتها
    <div className="min-h-screen bg-[url('/images/bg-circuit.jpg')] bg-cover bg-fixed bg-center relative flex items-center justify-center p-4 font-sans text-gray-200">
      
      {/* Overlay غامق عشان يطابق التيم العميق بتاع الموقع */}
      <div className="absolute inset-0 bg-[#070b14]/50 z-0"></div>

      {/* الفورم نفسها - واخدة نفس لون كروت المتجر والـ border الخفيف */}
      <div className="bg-[#0d1323]/80 backdrop-blur-md w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-800/60 z-10 relative">
        
        {/* Header - الأيقونة بتتغير ديناميكياً */}
        <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
            <div className="bg-blue-900/30 p-4 rounded-full text-blue-500 border border-blue-800/50 shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300">
            {/* لو تسجيل دخول أيقونة شخص، لو إنشاء حساب أيقونة مستخدم جديد */}
            {isLogin ? <User size={32} /> : <UserPlus size={32} />}
            </div>
        </div>
        
        <h2 className="text-3xl font-extrabold mb-2 text-white tracking-wide">
            {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <p className="text-gray-400 text-sm">
            {isLogin 
            ? 'Enter your credentials to access your workspace.' 
            : 'Join CircuitCore and start building your circuits.'}
        </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name Field (Sign Up Only) */}
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-[#070b14] border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors text-white placeholder-gray-600"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-[#070b14] border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors text-white placeholder-gray-600"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-[#070b14] border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors text-white placeholder-gray-600"
              required
              minLength="8"
            />
          </div>

          {/* Options (Login Only) */}
          {isLogin && (
            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="rounded bg-[#070b14] border-gray-700 text-blue-600 focus:ring-blue-600 h-4 w-4 transition-colors" />
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors ml-2">Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">Forgot Password?</a>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl mt-6 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
            <ArrowRight size={20} />
          </button>
        </form>

        {/* Toggle Log in / Sign up */}
        <p className="text-center text-gray-400 mt-8 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-400 font-bold transition-colors ml-1"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>

      </div>
    </div>
  );
}