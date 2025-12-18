// /* eslint-disable no-unused-vars */

// import { useCart } from "../context/CartContext";


// import React, { useState, useEffect } from "react";
// import {
//   FaUser,
//   FaShoppingCart,
//   FaBars,
//   FaTimes,
//   FaChevronDown,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/VR_Logo.png";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const { cartCount } = useCart();
//   const { cart } = useCart();



//   // ✅ Sticky Navbar on scroll
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ✅ Load user data on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");
//     if (token && storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   // ✅ Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setUserMenuOpen(false);
//     navigate("/login");
//   };

//   const dropdownItems = [
//     { label: "Veg", href: "#veg" },
//     { label: "Non-Veg", href: "#nonveg" },
//     { label: "Rice", href: "#rice" },
//     { label: "Roti", href: "#roti" },
//     { label: "Starter", href: "#starter" },
//     { label: "Dessert", href: "#dessert" },
//     { label: "Cold-Drinks", href: "#drinks" },
//   ];

//   return (
//     <motion.header
//       initial={{ y: -60, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
//         scrolled
//           ? "bg-white/60 backdrop-blur-md text-slate-800 shadow-sm"
//           : "text-white"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
//         {/* ✅ Logo */}
//         <div
//           className="flex items-center gap-3 cursor-pointer select-none"
//           onClick={() => navigate("/")}
//         >
//           <img
//             src={logo}
//             alt="VR Logo"
//             className={`w-10 h-10 rounded-full shadow-lg border-2 ${
//               scrolled ? "border-slate-300" : "border-white/60"
//             }`}
//           />
//           <div className="font-bold text-lg md:text-2xl leading-none">
//             <span className="block">Smart</span>
//             <span
//               className={`text-sm font-normal ${
//                 scrolled ? "text-slate-700" : "text-white/90"
//               }`}
//             >
//               Restaurant
//             </span>
//           </div>
//         </div>

//         {/* ✅ Desktop Menu */}
//         <nav className="hidden md:flex items-center gap-8 relative">
//           <div
//             className="relative"
//             onMouseEnter={() => setDropdownOpen(true)}
//             onMouseLeave={() => setDropdownOpen(false)}
//           >
//             <button
//               className={`flex items-center gap-1 font-semibold ${
//                 scrolled ? "text-slate-800" : "text-white"
//               } hover:text-[#ff4e50] transition`}
//             >
//               Menu <FaChevronDown className="text-xs mt-1" />
//             </button>

//             <AnimatePresence>
//               {dropdownOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute top-8 left-0 bg-white/95 backdrop-blur-md shadow-lg rounded-lg py-2 w-40 border border-gray-100"
//                 >
//                   {dropdownItems.map((item, i) => (
//                     <a
//                       key={i}
//                       href={item.href}
//                       className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff4e50] hover:to-[#f9d423] hover:text-white rounded-md transition"
//                     >
//                       {item.label}
//                     </a>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <a href="#about" className="hover:text-[#ff4e50] transition">
//             About
//           </a>
//           <a href="#chef" className="hover:text-[#ff4e50] transition">
//             Chef
//           </a>
//           <a href="#contact" className="hover:text-[#ff4e50] transition">
//             Contact
//           </a>
//         </nav>

//         {/* ✅ Right Side */}
//         <div className="flex items-center gap-4">
//           {/* Cart */}
//           {/* <button
//             className={`p-2 rounded-md hover:scale-105 transition ${
//               scrolled ? "text-slate-700" : "text-white"
//             }`}
//           >
//             <FaShoppingCart />
//           </button> */}

// <button
//   onClick={() => navigate("/cart")}
//   className="relative p-2 rounded-md hover:scale-105 transition"
// >
//   <FaShoppingCart />

//   {cartCount > 0 && (
//     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//       {cartCount}
//     </span>
//   )}
// </button>



//           {/* ✅ Show user info if logged in */}
//           {user ? (
//             <div className="relative select-none">
//               <div
//                 onClick={() => setUserMenuOpen(!userMenuOpen)}
//                 className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer ${
//                   scrolled
//                     ? "bg-slate-100 text-slate-800"
//                     : "bg-white/20 text-white"
//                 }`}
//               >
//                 <FaUser className="text-sm" />
//                 <span className="font-medium">{user.name}</span>
//                 <FaChevronDown className="text-xs" />
//               </div>

//               {/* ✅ Logout Dropdown */}
//               <AnimatePresence>
//                 {userMenuOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md overflow-hidden text-sm border border-gray-100"
//                   >
//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-gray-700 hover:text-red-500 transition"
//                     >
//                       <FaSignOutAlt /> Logout
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ) : (
//             // ✅ Show login only when user is not logged in
//             <button
//               onClick={() => navigate("/login")}
//               className={`p-2 rounded-md hover:scale-105 transition ${
//                 scrolled ? "text-slate-700" : "text-white"
//               }`}
//             >
//               <FaUser />
//             </button>
//           )}

//           {/* ✅ Mobile Menu Toggle */}
//           <button
//             className={`md:hidden p-2 text-xl ${
//               scrolled ? "text-slate-700" : "text-white"
//             }`}
//             onClick={() => setOpen((s) => !s)}
//             aria-label="menu"
//           >
//             {open ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* ✅ Mobile Drawer */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden md:hidden bg-white/95 text-slate-800"
//           >
//             <div className="px-6 py-4 space-y-3">
//               <details className="group">
//                 <summary className="flex justify-between items-center cursor-pointer py-2 font-semibold hover:text-[#ff4e50]">
//                   Menu
//                 </summary>
//                 <div className="pl-4 mt-2 flex flex-col gap-2">
//                   {dropdownItems.map((item, i) => (
//                     <a
//                       key={i}
//                       href={item.href}
//                       className="block py-1 text-gray-700 hover:text-[#ff4e50] transition"
//                     >
//                       {item.label}
//                     </a>
//                   ))}
//                 </div>
//               </details>

//               <a href="#about" className="block py-2 hover:text-[#ff4e50]">
//                 About
//               </a>
//               <a href="#chef" className="block py-2 hover:text-[#ff4e50]">
//                 Chef
//               </a>
//               <a href="#contact" className="block py-2 hover:text-[#ff4e50]">
//                 Contact
//               </a>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ✅ Gradient bar */}
//       <div
//         className={`hidden md:block h-1 w-full ${
//           scrolled
//             ? "bg-gradient-to-r from-sky-400 via-purple-300 to-sky-400"
//             : "bg-gradient-to-r from-[#ff4e50] via-[#f9d423] to-[#ff4e50] animate-gradient-move"
//         }`}
//       />
//     </motion.header>
//   );
// }

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/VR_Logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { cart } = useCart(); // ✅ ONLY THIS

  // ✅ Calculate cart count safely
  const cartCount = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // ✅ Sticky Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Load user
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/login");
  };

  const dropdownItems = [
    { label: "Veg", href: "#veg" },
    { label: "Non-Veg", href: "#nonveg" },
    { label: "Rice", href: "#rice" },
    { label: "Roti", href: "#roti" },
    { label: "Starter", href: "#starter" },
    { label: "Dessert", href: "#dessert" },
    { label: "Cold-Drinks", href: "#drinks" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? "bg-white/60 backdrop-blur-md text-slate-800 shadow-sm"
          : "text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className={`w-10 h-10 rounded-full border-2 ${
              scrolled ? "border-slate-300" : "border-white/60"
            }`}
          />
          <div className="font-bold text-lg leading-none">
            <span className="block">Smart</span>
            <span className="text-sm font-normal">Restaurant</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 font-semibold">
              Menu <FaChevronDown className="text-xs" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-8 left-0 bg-white text-black rounded-lg shadow-md w-40"
                >
                  {dropdownItems.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-yellow-400"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#about">About</a>
          <a href="#chef">Chef</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2"
          >
            <FaShoppingCart className="text-xl" />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2"
              >
                <FaUser />
                {user.name}
                <FaChevronDown className="text-xs" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 bg-white text-black rounded shadow-md"
                  >
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-red-100"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button onClick={() => navigate("/login")}>
              <FaUser />
            </button>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
