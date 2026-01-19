import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { ShoppingCart, Search, Home, BookOpen, Package, User, Heart, Star, Clock, Bike, ChevronRight, Plus, Minus, X, Menu as MenuIcon } from 'lucide-react';

// Cart Context
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = ({ itemId, name, price, image }) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.itemId === itemId);
      if (existing) {
        return prevCart.map(item =>
          item.itemId === itemId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { itemId, name, price, image, qty: 1 }];
    });
  };

  const removeItem = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.itemId !== itemId));
  };

  const updateQty = (itemId, qty) => {
    if (qty <= 0) {
      removeItem(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.itemId === itemId ? { ...item, qty } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// MenuItem Component
const MenuItem = ({ item }) => {
  const { addItem } = useCart();
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/60 border border-yellow-600 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
      <div className="relative h-48 overflow-hidden bg-gray-700">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 bg-black/50 backdrop-blur rounded-full p-2 hover:bg-black/70 transition"
        >
          <Heart
            className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-yellow-400 truncate">
          {item.name}
        </h3>

        <p className="text-gray-400 text-sm mb-2">{item.category}</p>

        <div className="flex items-center justify-between mb-3">
          <p className="text-yellow-300 font-bold text-lg">₹{item.price}</p>
          {item.rating && (
            <div className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
              <Star className="w-3 h-3 fill-current" />
              {item.rating}
            </div>
          )}
        </div>

        <button
          onClick={() =>
            addItem({
              itemId: item._id,
              name: item.name,
              price: item.price,
              image: item.image,
            })
          }
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

// Menu Section Component
const MenuSection = ({ title, items }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 border-l-4 border-yellow-500 pl-3">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div
            key={item._id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <MenuItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Cart Drawer Component
const CartDrawer = ({ isOpen, onClose, isMobile }) => {
  const { cart, removeItem, updateQty } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {isOpen && !isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed ${isMobile ? 'inset-0' : 'right-0 top-0 w-96 h-full'} bg-slate-900 shadow-xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : isMobile ? 'translate-y-full' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-yellow-600">
          <h2 className="text-2xl font-bold text-yellow-400">Your Cart</h2>
          <button onClick={onClose} className="text-white hover:text-yellow-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map(item => (
                <div key={item.itemId} className="bg-slate-800 rounded-lg p-4">
                  <div className="flex gap-4 mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-yellow-400">{item.name}</h3>
                      <p className="text-yellow-300 font-bold">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-slate-700 rounded">
                      <button
                        onClick={() => updateQty(item.itemId, item.qty - 1)}
                        className="px-2 py-1 text-yellow-400 hover:text-yellow-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 font-bold text-white">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.itemId, item.qty + 1)}
                        className="px-2 py-1 text-yellow-400 hover:text-yellow-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.itemId)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-yellow-600 p-6 space-y-3">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">Total:</span>
                <span className="text-yellow-400">₹{total}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold py-3 rounded-lg transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

// Main App Component
const MenuApp = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [darkMode, setDarkMode] = useState(true);
  const { cart } = useCart();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/menus');
        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data;
        setMenuItems(data || []);
      } catch (err) {
        setError('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const categories = [...new Set(menuItems.map(item => item.category))];
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const filteredItems = (items) =>
    items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-400 text-xl font-semibold">Loading Menu...</p>
        </div>
      </div>
    );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl font-semibold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold transition"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-yellow-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400">🍽️ Menu</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-yellow-400 hover:text-yellow-300"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-yellow-400 hover:text-yellow-300"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-slate-800 rounded-full px-4 py-2">
            <Search className="w-5 h-5 text-yellow-400" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 ml-3 outline-none bg-transparent text-white placeholder-gray-500"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-yellow-400 mb-16 tracking-wide">
          🍽️ Our Special Menu
        </h1>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No menu items available</p>
          </div>
        ) : (
          categories.map((category) => {
            const categoryItems = filteredItems(
              menuItems.filter(item => item.category === category)
            );

            return categoryItems.length > 0 ? (
              <MenuSection
                key={category}
                title={category}
                items={categoryItems}
              />
            ) : null;
          })
        )}

        {searchQuery && menuItems.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No dishes found for "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} isMobile={isMobile} />

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-yellow-600 flex justify-around items-center">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'menu', icon: BookOpen, label: 'Menu' },
            { id: 'orders', icon: Package, label: 'Orders' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex flex-col items-center py-3 transition ${
                activeTab === id ? 'text-yellow-400' : 'text-gray-500'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

// Main Wrapper with Context
export default function Menu() {
  return (
    <CartProvider>
      <MenuApp />
    </CartProvider>
  );
}