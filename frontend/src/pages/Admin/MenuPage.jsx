// // src/pages/Admin/MenuPage.jsx
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchMenus,
//   addMenu,
//   updateMenu,
//   toggleMenu,
//   deleteMenu,
//   clearMenuError,
// } from "../../redux/slices/menuSlice";
// import {
//   fetchRestaurants,
//   setSelectedRestaurant,
// } from "../../redux/slices/restaurantsSlice";
// import { Plus, Edit2, Trash2 } from "lucide-react";
// import { motion } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages", "Others"];

// export default function MenuPage() {
//   const dispatch = useDispatch();

//   // ===== Redux states =====
//   const menuState = useSelector((state) => state.menu) || {};
//   const { menus = [], loading: menuLoading, error: menuError } = menuState;

//   const restaurantState = useSelector((state) => state.restaurants) || {};
//   const {
//     list: restaurants = [],
//     loading: restLoading,
//     selectedRestaurantId,
//   } = restaurantState;

//   console.log("Restaurants:", restaurants);

//   // ===== Local component states =====
//   const [showModal, setShowModal] = useState(false);
//   const [menuItem, setMenuItem] = useState({
//     restaurantId: "",
//     name: "",
//     description: "",
//     price: "",
//     category: "Others",
//     image: "",
//     isAvailable: true,
//     veg: true,
//   });
//   const [editingMenu, setEditingMenu] = useState(null);

//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [page, setPage] = useState(1);
//   const pageSize = 8;



//   // When restaurants load, set default selected restaurant
// useEffect(() => {
//   if (restaurants.length > 0 && !selectedRestaurantId) {
//     setSelectedRestaurantId(restaurants[0]._id);  // ⭐ auto-select first restaurant
//     dispatch(fetchMenus(restaurants[0]._id));
//   }
// }, [restaurants]);

// if (!restaurantId) return;  // ⭐ IMPORTANT
// dispatch(fetchMenus(selectedRestaurantId));





//   // ===== Fetch restaurants on mount =====
//   useEffect(() => {
//     dispatch(fetchRestaurants());
//   }, [dispatch]);

//   // ===== Fetch menus when selected restaurant changes =====
//   useEffect(() => {
//     if (selectedRestaurantId) {
//       dispatch(fetchMenus(selectedRestaurantId));
//       setMenuItem((prev) => ({ ...prev, restaurantId: selectedRestaurantId }));
//     }
//   }, [dispatch, selectedRestaurantId]);

//   // ===== Handle errors =====
//   useEffect(() => {
//     if (menuError) {
//       toast.error(menuError);
//       dispatch(clearMenuError());
//     }
//   }, [menuError, dispatch]);

//  const handleRestaurantChange = (e) => {
//   const id = e.target.value;
//   dispatch(setSelectedRestaurant(id));
//   dispatch(fetchMenus(id)); // fetch only menus for selected restaurant
// };



//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setMenuItem((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

// const openAddModal = () => {
//   setEditingMenu(null);
//   setMenuItem({
//     restaurantId: selectedRestaurantId || "",
//     name: "",
//     description: "",
//     price: "",
//     category: "Others",
//     image: "",
//     isAvailable: true,
//     veg: true,
//   });
//   setShowModal(true);
// };

//   const handleSave = () => {
//     if (!menuItem.name || !menuItem.price || !menuItem.restaurantId) {
//       toast.error("Name, Price and Restaurant are required");
//       return;
//     }

//     if (editingMenu) {
//       dispatch(updateMenu({ id: editingMenu._id, data: menuItem }))
//         .unwrap()
//         .then(() => {
//           toast.success("Menu item updated successfully!");
//           setShowModal(false);
//         })
//         .catch(() => toast.error("Update failed"));
//     } else {
//       dispatch(addMenu(menuItem))
//         .unwrap()
//         .then(() => {
//           toast.success("Menu item added successfully!");
//           setShowModal(false);
//         })
//         .catch(() => toast.error("Add failed"));
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingMenu(item);
//     setMenuItem({
//       restaurantId: item.restaurantId || selectedRestaurantId,
//       name: item.name || "",
//       description: item.description || "",
//       price: item.price || "",
//       category: item.category || "Others",
//       image: item.image || "",
//       isAvailable: item.isAvailable ?? true,
//       veg: item.veg ?? true,
//     });
//     setShowModal(true);
//   };

//   const handleToggle = (item) => {
//     dispatch(toggleMenu({ id: item._id, isAvailable: !item.isAvailable }))
//       .unwrap()
//       .then(() => toast.success("Availability updated"))
//       .catch(() => toast.error("Toggle failed"));
//   };

//   const handleDelete = (item) => {
//     if (!window.confirm(`Delete menu item "${item.name}"?`)) return;
//     dispatch(deleteMenu(item._id))
//       .unwrap()
//       .then(() => toast.success("Menu item deleted"))
//       .catch(() => toast.error("Delete failed"));
//   };

//   // ===== Filtering and pagination =====
//   const filtered = (menus || []).filter((item) => {
//     if (selectedCategory !== "All" && (item.category || "") !== selectedCategory) return false;
//     const q = search.trim().toLowerCase();
//     if (!q) return true;
//     return (item.name || "").toLowerCase().includes(q) || (item.description || "").toLowerCase().includes(q);
//   });

//   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
//   const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

//   // ===== JSX =====
//   return (
//     <div style={{ padding: 20 }}>
//       <ToastContainer position="top-right" autoClose={2000} />

//       {/* Top controls */}
//       <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
//         <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//           <label style={{ fontWeight: 600 }}>Restaurant:</label>
//           <select
//             value={selectedRestaurantId || ""}
//             onChange={handleRestaurantChange}
//             style={{ padding: 8, borderRadius: 6 }}
//           >
//             {restLoading && <option>Loading...</option>}
//             {!restLoading && (
//               <>
//                 <option value="">Select Restaurant</option>
//                 {restaurants.map((r) => (
//                   <option key={r._id} value={r._id}>
//                     {r.name} ({r.type})
//                   </option>
//                 ))}
//               </>
//             )}
//           </select>
//         </div>

//         <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//           <input
//             placeholder="Search menu..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", width: 240 }}
//           />
//           <button
//             onClick={openAddModal}
//             style={{ display: "flex", alignItems: "center", gap: 8, background: "#10B981", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6 }}
//           >
//             <Plus size={16} /> Add Menu Item
//           </button>
//         </div>
//       </div>

//       {/* Categories */}
//       <div style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 12, flexWrap: "wrap" }}>
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => {
//               setSelectedCategory(cat);
//               setPage(1);
//             }}
//             style={{
//               padding: "6px 10px",
//               borderRadius: 20,
//               border: selectedCategory === cat ? "1px solid #10B981" : "1px solid #ddd",
//               background: selectedCategory === cat ? "#10B981" : "#fff",
//               color: selectedCategory === cat ? "#fff" : "#000",
//               cursor: "pointer",
//             }}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Menu table */}
//       <div style={{ overflowX: "auto" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ background: "#f7fafc" }}>
//               <th style={{ padding: 10, textAlign: "left" }}>Name</th>
//               <th style={{ padding: 10, textAlign: "left" }}>Category</th>
//               <th style={{ padding: 10, textAlign: "left" }}>Price</th>
//               <th style={{ padding: 10, textAlign: "left" }}>Available</th>
//               <th style={{ padding: 10, textAlign: "left" }}>Veg</th>
//               <th style={{ padding: 10, textAlign: "left" }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginated.length === 0 && (
//               <tr>
//                 <td colSpan={6} style={{ padding: 16, textAlign: "center" }}>
//                   No menu items found
//                 </td>
//               </tr>
//             )}

//             {paginated.map((item, idx) => (
//               <tr key={item._id} style={{ background: idx % 2 === 0 ? "#fafafa" : "#fff" }}>
//                 <td style={{ padding: 10 }}>{item.name}</td>
//                 <td style={{ padding: 10 }}>{item.category}</td>
//                 <td style={{ padding: 10 }}>₹{item.price}</td>
//                 <td style={{ padding: 10 }}>
//                   <input type="checkbox" checked={Boolean(item.isAvailable)} onChange={() => handleToggle(item)} />
//                 </td>
//                 <td style={{ padding: 10 }}>{item.veg ? "Veg" : "Non-Veg"}</td>
//                 <td style={{ padding: 10, display: "flex", gap: 8 }}>
//                   <button onClick={() => handleEdit(item)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
//                     <Edit2 size={16} />
//                   </button>
//                   <button onClick={() => handleDelete(item)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
//                     <Trash2 size={16} color="#b91c1c" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 6 }}>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               style={{
//                 padding: "6px 10px",
//                 borderRadius: 4,
//                 border: page === i + 1 ? "1px solid #10B981" : "1px solid #ddd",
//                 background: page === i + 1 ? "#10B981" : "#fff",
//                 color: page === i + 1 ? "#fff" : "#000",
//                 cursor: "pointer",
//               }}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.45)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 50,
//           }}
//         >
//           <motion.div
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//             exit={{ scale: 0.8 }}
//             style={{ width: 460, background: "#fff", padding: 18, borderRadius: 8 }}
//           >
//             <h2 style={{ marginTop: 0 }}>{editingMenu ? "Edit Menu Item" : "Add Menu Item"}</h2>

//             {/* Restaurant */}
//             <div style={{ marginBottom: 8 }}>
//               <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Restaurant</label>
//               <select
//                 name="restaurantId"
//                 value={menuItem.restaurantId}
//                 onChange={handleChange}
//                 style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
//               >
//                 <option value="">Select Restaurant</option>
//                 {restaurants.map((r) => (
//                   <option key={r._id} value={r._id}>
//                     {r.name} ({r.type})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Name */}
//             <div style={{ marginBottom: 8 }}>
//               <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Name</label>
//               <input
//                 name="name"
//                 value={menuItem.name}
//                 onChange={handleChange}
//                 style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
//               />
//             </div>

//             {/* Description */}
//             <div style={{ marginBottom: 8 }}>
//               <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Description</label>
//               <input
//                 name="description"
//                 value={menuItem.description}
//                 onChange={handleChange}
//                 style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
//               />
//             </div>

//             {/* Price */}
//             <div style={{ marginBottom: 8 }}>
//               <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={menuItem.price}
//                 onChange={handleChange}
//                 style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
//               />
//             </div>

//             {/* Category */}
//             <div style={{ marginBottom: 8 }}>
//               <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Category</label>
//               <select
//                 name="category"
//                 value={menuItem.category}
//                 onChange={handleChange}
//                 style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
//               >
//                 <option>Starters</option>
//                 <option>Main Course</option>
//                 <option>Desserts</option>
//                 <option>Beverages</option>
//                 <option>Others</option>
//               </select>
//             </div>

//             {/* Image */}
//             <div style={{ marginBottom: 8 }}>
//               <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Image URL</label>
//               <input
//                 name="image"
//                 value={menuItem.image}
//                 onChange={handleChange}
//                 style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
//               />
//             </div>

//             {/* Checkboxes */}
//             <div style={{ marginBottom: 8, display: "flex", gap: 12 }}>
//               <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
//                 <input type="checkbox" name="isAvailable" checked={menuItem.isAvailable} onChange={handleChange} />
//                 Available
//               </label>
//               <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
//                 <input type="checkbox" name="veg" checked={menuItem.veg} onChange={handleChange} />
//                 Veg
//               </label>
//             </div>

//             {/* Buttons */}
//             <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
//               <button
//                 onClick={() => setShowModal(false)}
//                 style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ddd", background: "#fff" }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 style={{ padding: "8px 12px", borderRadius: 6, background: "#0ea5a0", color: "#fff", border: "none" }}
//               >
//                 Save
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// }








// // src/pages/Admin/MenuPage.jsx
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchMenus,
//   addMenu,
//   updateMenu,
//   toggleMenu,
//   deleteMenu,
//   clearMenuError,
// } from "../../redux/slices/menuSlice";

// import {
//   fetchRestaurants,
//   setSelectedRestaurant,
// } from "../../redux/slices/restaurantsSlice";

// import { Plus, Edit2, Trash2 } from "lucide-react";
// import { motion } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages", "Others"];

// export default function MenuPage() {
//   const dispatch = useDispatch();

//   // Redux states
//   const { menus = [], loading: menuLoading, error: menuError } = useSelector(
//     (state) => state.menu
//   );

//   const {
//     list: restaurants = [],
//     loading: restLoading,
//     selectedRestaurantId,
//   } = useSelector((state) => state.restaurants);

//   // Local states
//   const [showModal, setShowModal] = useState(false);
//   const [editingMenu, setEditingMenu] = useState(null);

//   const [menuItem, setMenuItem] = useState({
//     restaurantId: "",
//     name: "",
//     description: "",
//     price: "",
//     category: "Others",
//     image: "",
//     isAvailable: true,
//     veg: true,
//   });

//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [page, setPage] = useState(1);
//   const pageSize = 8;

//   // 1️⃣ Fetch restaurants on mount
//   useEffect(() => {
//     dispatch(fetchRestaurants());
//   }, [dispatch]);

//   // 2️⃣ Auto-select first restaurant when restaurants load
//   useEffect(() => {
//     if (restaurants.length > 0 && !selectedRestaurantId) {
//       const firstId = restaurants[0]._id;
//       dispatch(setSelectedRestaurant(firstId));
//       dispatch(fetchMenus(firstId));
//     }
//   }, [restaurants, dispatch, selectedRestaurantId]);

//   // 3️⃣ Fetch menus when selected restaurant changes
//   useEffect(() => {
//     if (selectedRestaurantId) {
//       dispatch(fetchMenus(selectedRestaurantId));
//       setMenuItem((prev) => ({ ...prev, restaurantId: selectedRestaurantId }));
//     }
//   }, [selectedRestaurantId, dispatch]);

//   // 4️⃣ Handle errors
//   useEffect(() => {
//     if (menuError) {
//       toast.error(menuError);
//       dispatch(clearMenuError());
//     }
//   }, [menuError, dispatch]);

//   // Change restaurant from dropdown
//   const handleRestaurantChange = (e) => {
//     const id = e.target.value;
//     dispatch(setSelectedRestaurant(id));
//     dispatch(fetchMenus(id));
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setMenuItem((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Add Menu
//   const openAddModal = () => {
//     setEditingMenu(null);
//     setMenuItem({
//       restaurantId: selectedRestaurantId,
//       name: "",
//       description: "",
//       price: "",
//       category: "Others",
//       image: "",
//       isAvailable: true,
//       veg: true,
//     });
//     setShowModal(true);
//   };

//   const handleSave = () => {
//     if (!menuItem.name || !menuItem.price || !menuItem.restaurantId) {
//       toast.error("Name, Price and Restaurant are required");
//       return;
//     }

//     if (editingMenu) {
//       dispatch(updateMenu({ id: editingMenu._id, data: menuItem }))
//         .unwrap()
//         .then(() => {
//           toast.success("Menu updated successfully!");
//           setShowModal(false);
//         });
//     } else {
//       dispatch(addMenu(menuItem))
//         .unwrap()
//         .then(() => {
//           toast.success("Menu added successfully!");
//           setShowModal(false);
//         });
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingMenu(item);
//     setMenuItem({
//       restaurantId: item.restaurantId || selectedRestaurantId,
//       name: item.name,
//       description: item.description,
//       price: item.price,
//       category: item.category,
//       image: item.image,
//       isAvailable: item.isAvailable,
//       veg: item.veg,
//     });
//     setShowModal(true);
//   };

//   const handleToggle = (item) => {
//     dispatch(toggleMenu({ id: item._id, isAvailable: !item.isAvailable }));
//   };

//   const handleDelete = (item) => {
//     if (!window.confirm("Delete this menu item?")) return;
//     dispatch(deleteMenu(item._id));
//   };

//   // Filtering
//   const filtered = menus.filter((item) => {
//     if (selectedCategory !== "All" && item.category !== selectedCategory) return false;

//     const q = search.toLowerCase();
//     return (
//       item.name.toLowerCase().includes(q) ||
//       item.description.toLowerCase().includes(q)
//     );
//   });

//   // Pagination
//   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
//   const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

//   // UI
//   return (
//     <div style={{ padding: 20 }}>
//       <ToastContainer position="top-right" autoClose={2000} />

//       {/* Restaurant Select */}
//       <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
//         <div style={{ display: "flex", gap: 12 }}>
//           <label>Restaurant:</label>
//           <select
//             value={selectedRestaurantId || ""}
//             onChange={handleRestaurantChange}
//             style={{ padding: 8 }}
//           >
//             <option value="">Select Restaurant</option>
//             {restaurants.map((r) => (
//               <option key={r._id} value={r._id}>
//                 {r.name} ({r.type})
//               </option>
//             ))}
//           </select>
//         </div>

//         <div style={{ display: "flex", gap: 8 }}>
//           <input
//             placeholder="Search menu..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{ padding: 8, width: 240 }}
//           />

//           <button
//             onClick={openAddModal}
//             style={{ background: "#10B981", color: "#fff", padding: "8px 12px" }}
//           >
//             <Plus size={16} /> Add Menu
//           </button>
//         </div>
//       </div>

//       {/* Categories */}
//       <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             style={{
//               padding: "6px 10px",
//               borderRadius: 20,
//               background: selectedCategory === cat ? "#10B981" : "#fff",
//               color: selectedCategory === cat ? "#fff" : "#000",
//             }}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Menu Table */}
//       <table style={{ width: "100%", marginTop: 20 }}>
//         <thead>
//           <tr style={{ background: "#f7fafc" }}>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Price</th>
//             <th>Available</th>
//             <th>Veg</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginated.length === 0 ? (
//             <tr>
//               <td colSpan={6} style={{ textAlign: "center", padding: 16 }}>
//                 No menu items found
//               </td>
//             </tr>
//           ) : (
//             paginated.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.name}</td>
//                 <td>{item.category}</td>
//                 <td>₹{item.price}</td>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={item.isAvailable}
//                     onChange={() => handleToggle(item)}
//                   />
//                 </td>
//                 <td>{item.veg ? "Veg" : "Non-Veg"}</td>
//                 <td>
//                   <button onClick={() => handleEdit(item)}>
//                     <Edit2 size={16} />
//                   </button>
//                   <button onClick={() => handleDelete(item)}>
//                     <Trash2 size={16} color="red" />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Modal */}
//       {showModal && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.45)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <motion.div
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//             style={{ background: "#fff", padding: 20, width: 400 }}
//           >
//             <h2>{editingMenu ? "Edit Menu" : "Add Menu"}</h2>

//             <label>Restaurant</label>
//             <select
//               name="restaurantId"
//               value={menuItem.restaurantId}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 8 }}
//             >
//               <option value="">Select</option>
//               {restaurants.map((r) => (
//                 <option key={r._id} value={r._id}>
//                   {r.name}
//                 </option>
//               ))}
//             </select>

//             <label>Name</label>
//             <input
//               name="name"
//               value={menuItem.name}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 8 }}
//             />

//             <label>Description</label>
//             <input
//               name="description"
//               value={menuItem.description}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 8 }}
//             />

//             <label>Price</label>
//             <input
//               type="number"
//               name="price"
//               value={menuItem.price}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 8 }}
//             />

//             <label>Category</label>
//             <select
//               name="category"
//               value={menuItem.category}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 8 }}
//             >
//               <option>Starters</option>
//               <option>Main Course</option>
//               <option>Desserts</option>
//               <option>Beverages</option>
//               <option>Others</option>
//             </select>

//             <label>Image URL</label>
//             <input
//               name="image"
//               value={menuItem.image}
//               onChange={handleChange}
//               style={{ width: "100%", padding: 8 }}
//             />

//             <label>
//               <input
//                 type="checkbox"
//                 name="isAvailable"
//                 checked={menuItem.isAvailable}
//                 onChange={handleChange}
//               />
//               Available
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 name="veg"
//                 checked={menuItem.veg}
//                 onChange={handleChange}
//               />
//               Veg
//             </label>

//             <button onClick={() => setShowModal(false)}>Cancel</button>
//             <button onClick={handleSave}>Save</button>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// }



// src/pages/Admin/MenuPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenus,
  addMenu,
  updateMenu,
  toggleMenu,
  deleteMenu,
  clearMenuError,
} from "../../redux/slices/menuSlice";

import {
  fetchRestaurants,
  setSelectedRestaurant,
} from "../../redux/slices/restaurantsSlice";

import { Plus, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages", "Others"];

export default function MenuPage() {
  const dispatch = useDispatch();

  // ===== Redux states =====
  const { menus = [], loading: menuLoading, error: menuError } = useSelector(
    (state) => state.menu
  );

  const {
    list: restaurants = [],
    loading: restLoading,
    selectedRestaurantId,
  } = useSelector((state) => state.restaurants);

  // ===== Local Component State =====
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [menuItem, setMenuItem] = useState({
    restaurantId: "",
    name: "",
    description: "",
    price: "",
    category: "Others",
    image: "",
    isAvailable: true,
    veg: true,
  });

  const [editingMenu, setEditingMenu] = useState(null);

  // ===== Load Restaurants Once =====
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // ===== Auto-select first restaurant + fetch menus =====
  useEffect(() => {
    if (restaurants.length > 0 && !selectedRestaurantId) {
      const firstId = restaurants[0]._id;
      dispatch(setSelectedRestaurant(firstId));
      dispatch(fetchMenus(firstId));
    }
  }, [restaurants]);

  // ===== Fetch Menus When Restaurant Changes =====
  useEffect(() => {
    if (selectedRestaurantId) {
      dispatch(fetchMenus(selectedRestaurantId));
      setMenuItem((prev) => ({ ...prev, restaurantId: selectedRestaurantId }));
    }
  }, [selectedRestaurantId]);

  // ===== Handle Errors =====
  useEffect(() => {
    if (menuError) {
      toast.error(menuError);
      dispatch(clearMenuError());
    }
  }, [menuError]);

  // ===== Update Restaurant Dropdown =====
  const handleRestaurantChange = (e) => {
    const id = e.target.value;
    dispatch(setSelectedRestaurant(id));
    dispatch(fetchMenus(id));
  };

  // ===== Input Handler =====
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===== Open Add Modal =====
  const openAddModal = () => {
    setEditingMenu(null);
    setMenuItem({
      restaurantId: selectedRestaurantId || "",
      name: "",
      description: "",
      price: "",
      category: "Others",
      image: "",
      isAvailable: true,
      veg: true,
    });
    setShowModal(true);
  };

  // ===== Save/Add Menu =====
  const handleSave = () => {
    if (!menuItem.name || !menuItem.price || !menuItem.restaurantId) {
      toast.error("Name, Price, and Restaurant are required");
      return;
    }

    if (editingMenu) {
      dispatch(updateMenu({ id: editingMenu._id, data: menuItem }))
        .unwrap()
        .then(() => {
          toast.success("Menu updated");
          setShowModal(false);
        })
        .catch(() => toast.error("Update failed"));
    } else {
      dispatch(addMenu(menuItem))
        .unwrap()
        .then(() => {
          toast.success("Menu added");
          setShowModal(false);
        })
        .catch(() => toast.error("Add failed"));
    }
  };

  // ===== Edit =====
  const handleEdit = (item) => {
    setEditingMenu(item);
    setMenuItem({
      restaurantId: item.restaurantId,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isAvailable: item.isAvailable,
      veg: item.veg,
    });
    setShowModal(true);
  };

  // ===== Toggle Status =====
  const handleToggle = (item) => {
    dispatch(toggleMenu({ id: item._id, isAvailable: !item.isAvailable }))
      .unwrap()
      .then(() => toast.success("Status updated"))
      .catch(() => toast.error("Failed"));
  };

  // ===== Delete =====
  const handleDelete = (item) => {
    if (!window.confirm(`Delete "${item.name}"?`)) return;

    dispatch(deleteMenu(item._id))
      .unwrap()
      .then(() => toast.success("Deleted"))
      .catch(() => toast.error("Delete failed"));
  };

  // ===== Filtering =====
  const filtered = menus.filter((item) => {
    if (selectedCategory !== "All" && item.category !== selectedCategory) return false;

    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // ===== UI =====
  return (
    <div style={{ padding: 20 }}>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
        {/* Restaurant Dropdown */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <label style={{ fontWeight: 600 }}>Restaurant:</label>
          <select
            value={selectedRestaurantId || ""}
            onChange={handleRestaurantChange}
            style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name} ({r.type})
              </option>
            ))}
          </select>
        </div>

        {/* Search + Add */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ddd",
              width: 250,
            }}
          />

          <button
            onClick={openAddModal}
            style={{
              background: "#10B981",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: 6,
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Plus size={16} /> Add Menu
          </button>
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setPage(1);
            }}
            style={{
              padding: "6px 12px",
              borderRadius: 20,
              background: selectedCategory === cat ? "#10B981" : "#fff",
              color: selectedCategory === cat ? "#fff" : "#000",
              border: "1px solid #10B981",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: 10, textAlign: "left" }}>Name</th>
              <th style={{ padding: 10 }}>Category</th>
              <th style={{ padding: 10 }}>Price</th>
              <th style={{ padding: 10 }}>Available</th>
              <th style={{ padding: 10 }}>Veg</th>
              <th style={{ padding: 10 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 20, textAlign: "center" }}>
                  No menu items found
                </td>
              </tr>
            )}

            {paginated.map((item, idx) => (
              <tr key={item._id} style={{ background: idx % 2 === 0 ? "#fafafa" : "#fff" }}>
                <td style={{ padding: 10 }}>{item.name}</td>
                <td style={{ padding: 10 }}>{item.category}</td>
                <td style={{ padding: 10 }}>₹{item.price}</td>
                <td style={{ padding: 10 }}>
                  <input
                    type="checkbox"
                    checked={item.isAvailable}
                    onChange={() => handleToggle(item)}
                  />
                </td>
                <td style={{ padding: 10 }}>
                  {item.veg ? "Veg" : "Non-Veg"}
                </td>
                <td style={{ padding: 10, display: "flex", gap: 8 }}>
                  <button onClick={() => handleEdit(item)} style={{ border: "none", background: "transparent" }}>
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(item)}
                    style={{ border: "none", background: "transparent" }}
                  >
                    <Trash2 size={16} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: 15, display: "flex", justifyContent: "center", gap: 8 }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                background: page === i + 1 ? "#10B981" : "#fff",
                border: "1px solid #10B981",
                color: page === i + 1 ? "#fff" : "#10B981",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            style={{
              width: 460,
              background: "#fff",
              padding: 20,
              borderRadius: 8,
            }}
          >
            <h2 style={{ margin: 0, marginBottom: 15 }}>
              {editingMenu ? "Edit Menu" : "Add Menu"}
            </h2>

            {/* Restaurant */}
            <label>Restaurant</label>
            <select
              name="restaurantId"
              value={menuItem.restaurantId}
              onChange={handleChange}
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginBottom: 10 }}
            >
              <option value="">Select Restaurant</option>
              {restaurants.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>

            {/* Name */}
            <label>Name</label>
            <input
              name="name"
              value={menuItem.name}
              onChange={handleChange}
              style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 6, marginBottom: 10 }}
            />

            {/* Description */}
            <label>Description</label>
            <input
              name="description"
              value={menuItem.description}
              onChange={handleChange}
              style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 6, marginBottom: 10 }}
            />

            {/* Price */}
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={menuItem.price}
              onChange={handleChange}
              style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 6, marginBottom: 10 }}
            />

            {/* Category */}
            <label>Category</label>
            <select
              name="category"
              value={menuItem.category}
              onChange={handleChange}
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", marginBottom: 10 }}
            >
              <option>Starters</option>
              <option>Main Course</option>
              <option>Desserts</option>
              <option>Beverages</option>
              <option>Others</option>
            </select>

            {/* Image */}
            <label>Image URL</label>
            <input
              name="image"
              value={menuItem.image}
              onChange={handleChange}
              style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 6, marginBottom: 10 }}
            />

            {/* Checkboxes */}
            <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
              <label>
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={menuItem.isAvailable}
                  onChange={handleChange}
                />
                {" "}Available
              </label>

              <label>
                <input
                  type="checkbox"
                  name="veg"
                  checked={menuItem.veg}
                  onChange={handleChange}
                />
                {" "}Veg
              </label>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: "8px 12px", borderRadius: 6, background: "#ccc", border: "none" }}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                style={{ padding: "8px 12px", borderRadius: 6, background: "#10B981", color: "#fff", border: "none" }}
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
