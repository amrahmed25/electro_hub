import Header from "./Header";
import { useCart } from "../CartContext";

function ShoppingCart() {
  const { items, increaseQty, decreaseQty, removeItem } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 5.0 : 0;
  const taxes = subtotal * 0.1;
  const total = subtotal + shipping + taxes;

  return (
    <div className="min-h-screen bg-[#0b132b] text-white font-sans">
      <Header />

      <div className="pt-[70px] pl-10 pr-10 pb-10">
        <h2 className="text-white mb-6 text-2xl font-semibold">
          CIRCUITCORE | Shopping Cart
        </h2>

        <div className="flex gap-5 items-start">
          {/* Cart items */}
          <div className="flex-[3]">
            <div className="grid grid-cols-[80px_1fr_150px_150px_100px_90px] items-center gap-2.5 text-center bg-[#20212c] rounded-xl p-4 mb-2.5 font-bold">
              <div>Product Image</div>
              <div>Component</div>
              <div>Package</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Remove</div>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[80px_1fr_150px_150px_100px_90px] items-center gap-2.5 text-center bg-[#20212c] rounded-xl p-4 mb-2.5"
              >
                <div className="w-[60px] h-[60px] bg-[#3a3d4d] rounded-lg flex justify-center items-center mx-auto overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    "Image"
                  )}
                </div>

                <div className="text-center">
                  <div className="font-semibold">{item.name}</div>
                  {item.manufacturer && (
                    <div className="text-xs text-gray-400">
                      {item.manufacturer}
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-300">
                  {item.package || "-"}
                </div>

                <div className="flex justify-center items-center gap-2.5">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-[26px] h-[26px] rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold flex justify-center items-center leading-none"
                  >
                    -
                  </button>
                  <span className="min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-[26px] h-[26px] rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold flex justify-center items-center leading-none"
                  >
                    +
                  </button>
                </div>

                <div>${item.price.toFixed(2)}</div>

                <div
                  onClick={() => removeItem(item.id)}
                  className="text-[#ff5d5d] cursor-pointer font-bold"
                >
                  Remove
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <p className="text-center opacity-70">Your cart is empty.</p>
            )}
          </div>

          {/* Order summary */}
          <div className="flex-1 bg-[#20212c] rounded-xl p-5 sticky top-[90px]">
            <h3 className="mt-0 text-lg font-semibold">Order Summary</h3>

            <p className="flex justify-between my-4">
              <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between my-4">
              <span>Shipping:</span> <span>${shipping.toFixed(2)}</span>
            </p>
            <p className="flex justify-between my-4">
              <span>Taxes:</span> <span>${taxes.toFixed(2)}</span>
            </p>

            <hr className="border-none border-t border-[#555] my-5" />

            <h3 className="text-lg font-semibold">
              Total: ${total.toFixed(2)}
            </h3>

            <button className="w-full mt-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-base cursor-pointer">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;