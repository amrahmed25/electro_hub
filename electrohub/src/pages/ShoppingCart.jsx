import Header from "./Header"; 
import { useCart } from "../CartContext";
import { Trash2, Minus, Plus } from "lucide-react"; 

function ShoppingCart() {
  const { items, increaseQty, decreaseQty, removeItem } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 50.0 : 0;
  const taxes = subtotal * 0.14; 
  const total = subtotal + shipping + taxes;

  return (
    <div className="min-h-screen bg-[url('/images/bg-circuit.jpg')] bg-cover bg-fixed bg-center relative font-sans text-gray-200">
      <div className="absolute inset-0 bg-[#070b14]/50 z-0"></div>

      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        <Header />

        <style>{`
          @keyframes floatUp { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
          .fade-up { animation: floatUp .55s cubic-bezier(.16,1,.3,1) both; }
        `}</style>

        <div className="flex-1 overflow-y-auto p-6 mt-16">
          <div className="max-w-[1400px] mx-auto">
            
            <h2 className="fade-up text-3xl font-extrabold mb-8 tracking-wider bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]">
              Shopping Cart
            </h2>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              <div className="flex-[3] w-full overflow-x-auto pb-4">
                <div className="min-w-[800px]">
                  
                  <div 
                    className="fade-up grid grid-cols-[80px_1fr_150px_150px_100px_90px] items-center gap-2.5 text-center bg-[#0d1323]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-4 mb-4 font-bold text-[11px] uppercase tracking-widest text-gray-400 shadow-xl"
                    style={{ animationDelay: "40ms" }}
                  >
                    <div>Product Image</div>
                    <div className="text-left pl-8">Component</div>
                    <div>Package</div>
                    <div>Quantity</div>
                    <div>Price</div>
                    <div>Remove</div>
                  </div>

                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="fade-up grid grid-cols-[80px_1fr_150px_150px_100px_90px] items-center gap-2.5 text-center bg-[#0d1323]/60 backdrop-blur-md border border-gray-800/60 hover:border-blue-600/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.05)] rounded-2xl p-4 mb-3 transition-all duration-300 group"
                      style={{ animationDelay: `${80 + index * 40}ms` }}
                    >
                      <div className="w-[60px] h-[60px] bg-white rounded-xl flex justify-center items-center mx-auto overflow-hidden p-1 shadow-inner">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">Image</span>
                        )}
                      </div>

                      <div className="text-left pl-8">
                        <div className="text-sm font-bold text-white line-clamp-1">{item.name}</div>
                        {item.manufacturer && (
                          <div className="text-[10px] text-blue-400 bg-blue-900/30 border border-blue-800/50 px-2 py-0.5 rounded-md inline-block mt-1 font-bold tracking-wider uppercase">
                            {item.manufacturer.substring(0, 8)}
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-gray-400 font-mono">
                        {item.package || "-"}
                      </div>

                      <div className="flex items-center bg-[#070b14] border border-gray-800 rounded-xl overflow-hidden h-9 w-24 mx-auto">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="px-2.5 text-gray-500 hover:text-white hover:bg-gray-800 transition-colors h-full flex items-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-full text-center bg-transparent text-white text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="px-2.5 text-gray-500 hover:text-white hover:bg-gray-800 transition-colors h-full flex items-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="font-extrabold text-white text-sm">
                        EGP {item.price.toFixed(2)}
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors flex items-center justify-center"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="fade-up flex flex-col items-center justify-center py-16 bg-[#0d1323]/40 backdrop-blur-md border border-gray-800/60 rounded-2xl" style={{ animationDelay: "80ms" }}>
                      <Trash2 size={48} className="text-gray-600 mb-4 opacity-50" />
                      <p className="text-center text-gray-400 text-lg font-medium">Your cart is empty.</p>
                      <p className="text-center text-gray-500 text-sm mt-1">Add some components from the library to get started!</p>
                    </div>
                  )}
                </div>
              </div>

              <div 
                className="fade-up flex-1 w-full lg:min-w-[350px] bg-[#0d1323]/60 backdrop-blur-md rounded-2xl border border-gray-800/60 p-6 shadow-2xl lg:sticky lg:top-6 h-fit"
                style={{ animationDelay: "120ms" }}
              >
                <h3 className="text-[11px] font-extrabold tracking-widest text-gray-400 mb-6 uppercase border-b border-gray-800/60 pb-4">
                  Order Summary
                </h3>

                <div className="space-y-4 text-sm font-medium text-gray-400 mb-6">
                  <p className="flex justify-between">
                    <span>Subtotal:</span> <span className="text-white">EGP {subtotal.toFixed(2)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Shipping:</span> <span className="text-white">EGP {shipping.toFixed(2)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Taxes (14% VAT):</span> <span className="text-white">EGP {taxes.toFixed(2)}</span>
                  </p>
                </div>

                <hr className="border-gray-800/60 my-5" />

                <h3 className="text-lg font-bold flex justify-between items-center text-white mb-6">
                  <span>Total:</span> <span className="text-2xl font-extrabold text-blue-400">EGP {total.toFixed(2)}</span>
                </h3>

                <button 
                  disabled={items.length === 0}
                  className="w-full py-3.5 rounded-xl font-bold transition-all h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;