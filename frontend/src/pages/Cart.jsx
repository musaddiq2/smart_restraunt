import { useAppContext } from "../context/AppContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useAppContext();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-10">
            Your cart is empty 😔
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-4"
                >
                  {/* Image */}
                  <div className="flex items-center gap-4 w-full md:w-1/2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                      <p className="text-pink-600 font-semibold mt-1">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <div className="mt-4 md:mt-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-lg font-medium text-gray-700">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-gray-700 mt-2">
                <span>Delivery Fee:</span>
                <span>₹{subtotal > 0 ? 50 : 0}</span>
              </div>
              <div className="flex justify-between text-xl font-semibold text-gray-800 mt-4">
                <span>Total:</span>
                <span>₹{(subtotal > 0 ? subtotal + 50 : 0).toFixed(2)}</span>
              </div>

              <div className="mt-8 flex justify-center">
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                  Proceed to Checkout →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
