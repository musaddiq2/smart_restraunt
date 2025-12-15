// src/pages/Admin/MenuPage.jsx
import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenus,
  addMenu,
  updateMenu,
  toggleMenu,
  deleteMenu,
  clearMenuError,
} from "../../redux/slices/menuSlice";
import { fetchRestaurants, setSelectedRestaurant } from "../../redux/slices/restaurantsSlice";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gsap } from "gsap";

export default function MenuPage() {
  const dispatch = useDispatch();
  const { menus = [], error: menuError } = useSelector((state) => state.menu);
  const { list: restaurants = [], selectedRestaurantId } = useSelector((state) => state.restaurants);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [menuItem, setMenuItem] = useState({
    restaurantId: "",
    name: "",
    description: "",
    price: "",
    category: "Others",
    imageFile: null,
    isAvailable: true,
    veg: true,
  });
  const [editingMenu, setEditingMenu] = useState(null);
  const rowsRef = useRef([]);
  rowsRef.current = [];

  const categories = [
    "All",
    "Starters / Appetizers",
    "Soups",
    "Salads",
    "Main Course - Veg",
    "Main Course - Non Veg",
    "Breads",
    "Rice & Biryani",
    "Chinese",
    "Fast Food",
    "Pizzas",
    "Burgers",
    "Sandwiches",
    "Pasta",
    "Combo Meals",
    "Desserts",
    "Ice Creams",
    "Beverages",
    "Milkshakes",
    "Fresh Juices",
    "Snacks",
    "Others",
  ];

  // Initial fetch
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // Set default selected restaurant
  useEffect(() => {
    if (restaurants.length > 0 && !selectedRestaurantId) {
      dispatch(setSelectedRestaurant(restaurants[0]._id));
    }
  }, [restaurants]);



  useEffect(() => {
  // if no restaurant selected, fetch all menus
  if (!selectedRestaurantId) {
    dispatch(fetchMenus());           // backend: return all menus when no id
  } else {
    dispatch(fetchMenus(selectedRestaurantId));
  }

  setMenuItem((prev) => ({
    ...prev,
    restaurantId: selectedRestaurantId || ""
  }));
}, [selectedRestaurantId, dispatch]);



  // Toast error
  useEffect(() => {
    if (menuError) {
      toast.error(menuError);
      dispatch(clearMenuError());
    }
  }, [menuError]);

  // GSAP animation
  useEffect(() => {
    if (!rowsRef.current.length) return;
    gsap.fromTo(
      rowsRef.current,
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" }
    );
  }, [menus, search, typeFilter, statusFilter, sortBy]);

  const addRowRef = (el) => {
    if (el && !rowsRef.current.includes(el)) rowsRef.current.push(el);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "imageFile") {
      if (files[0]) setMenuItem((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setMenuItem((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const resetForm = () => {
    setMenuItem({
      restaurantId: selectedRestaurantId || "",
      name: "",
      description: "",
      price: "",
      category: "Others",
      imageFile: null,
      isAvailable: true,
      veg: true,
    });
  };

  const openAddModal = () => {
    setEditingMenu(null);
    resetForm();
    setShowModal(true);
  };

  const handleSave = () => {
    if (!menuItem.name || !menuItem.price || !menuItem.restaurantId) {
      toast.error("Name, Price, and Restaurant are required");
      return;
    }

    const formData = new FormData();
    formData.append("restaurantId", menuItem.restaurantId);
    formData.append("name", menuItem.name);
    formData.append("description", menuItem.description);
    formData.append("price", menuItem.price);
    formData.append("category", menuItem.category);
    formData.append("isAvailable", menuItem.isAvailable);
    formData.append("veg", menuItem.veg);
    if (menuItem.imageFile) formData.append("image", menuItem.imageFile);

    const action = editingMenu
      ? updateMenu({ id: editingMenu._id, data: formData })
      : addMenu(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(editingMenu ? "Menu updated successfully!" : "Menu added successfully!");
        setShowModal(false);
        dispatch(fetchMenus(selectedRestaurantId));
      })
      .catch(() => toast.error(editingMenu ? "Update failed" : "Add failed"));
  };

  const handleEdit = (item) => {
    setEditingMenu(item);
    setMenuItem({
      restaurantId: item.restaurantId,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      imageFile: null,
      isAvailable: item.isAvailable,
      veg: item.veg,
    });
    setShowModal(true);
  };

  const handleToggle = (item) => {
    dispatch(toggleMenu({ id: item._id, isAvailable: !item.isAvailable }))
      .unwrap()
      .then(() => {
        toast.success("Status updated");
        dispatch(fetchMenus(selectedRestaurantId));
      })
      .catch(() => toast.error("Failed"));
  };

  const handleDelete = (item) => {
    if (!window.confirm(`Delete "${item.name}"?`)) return;
    dispatch(deleteMenu(item._id))
      .unwrap()
      .then(() => {
        toast.success("Deleted successfully!");
        dispatch(fetchMenus(selectedRestaurantId));
      })
      .catch(() => toast.error("Delete failed"));
  };

  // FILTERED MENU
  const filteredMenus = useMemo(() => {
    let data = Array.isArray(menus) ? [...menus] : [];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (item) =>
          (item.name || "").toLowerCase().includes(q) ||
          (item.description || "").toLowerCase().includes(q)
      );
    }

    // Type filter
    if (typeFilter !== "All") {
      data = data.filter((item) => (item.veg ? "Veg" : "Non-Veg") === typeFilter);
    }

    // Availability filter
    if (statusFilter !== "All") {
      data = data.filter((item) =>
        statusFilter === "Available" ? item.isAvailable : !item.isAvailable
      );
    }

    // Sort
    if (sortBy === "az") data.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    if (sortBy === "za") data.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    if (sortBy === "newest") data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    return data;
  }, [menus, search, typeFilter, statusFilter, sortBy]);

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Menu Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow transition"
        >
          <Plus size={18} /> Add Menu
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          value={selectedRestaurantId || ""}
          onChange={(e) => dispatch(setSelectedRestaurant(e.target.value))}
          className="px-4 py-2 rounded-xl border border-gray-300"
        >
          <option value="">Select Restaurant</option>
          {restaurants.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name} ({r.type})
            </option>
          ))}
        </select>

        <input
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300"
        />

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 rounded-xl border border-gray-300">
          <option value="All">All Types</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 rounded-xl border border-gray-300">
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 rounded-xl border border-gray-300">
          <option value="newest">Newest</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Availability</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {filteredMenus.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500">
                  No menu items found.
                </td>
              </tr>
            ) : (
              filteredMenus.map((item) => (
                <tr key={item._id} ref={addRowRef} className="hover:bg-green-50 border-b last:border-none transition">
                  <td className="px-6 py-4">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    ) : "No Image"}
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={item.isAvailable} onChange={() => handleToggle(item)} />
                  </td>
                  <td className="px-6 py-4">{item.veg ? "Veg" : "Non-Veg"}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button onClick={() => handleEdit(item)} className="p-2 rounded-full hover:bg-blue-50 text-blue-600">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(item)} className="p-2 rounded-full hover:bg-red-50 text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-2xl w-[500px] shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingMenu ? "Edit Menu" : "Add Menu"}
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <select
                  name="restaurantId"
                  value={menuItem.restaurantId}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 rounded-lg border"
                >
                  <option value="">Select Restaurant</option>
                  {restaurants.map((r) => (
                    <option key={r._id} value={r._id}>{r.name} ({r.type})</option>
                  ))}
                </select>

                <select
                  name="category"
                  value={menuItem.category}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 rounded-lg border"
                >
                  {categories.slice(1).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 flex-wrap">
                <input
                  name="name"
                  value={menuItem.name}
                  onChange={handleChange}
                  placeholder="Menu Name"
                  className="flex-1 px-4 py-2 rounded-lg border"
                />
                <input
                  type="number"
                  name="price"
                  value={menuItem.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="flex-1 px-4 py-2 rounded-lg border"
                />
              </div>

              <input
                name="description"
                value={menuItem.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full px-4 py-2 rounded-lg border"
              />

              <div className="flex items-center gap-4 flex-wrap">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="isAvailable" checked={menuItem.isAvailable} onChange={handleChange} />
                  Available
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="veg" checked={menuItem.veg} onChange={handleChange} />
                  Veg
                </label>

                {/* Drag & Drop */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      setMenuItem((prev) => ({ ...prev, imageFile: e.dataTransfer.files[0] }));
                    }
                  }}
                  onClick={() => document.getElementById("fileInput").click()}
                  className="flex-1 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-500 transition text-gray-500 relative"
                >
                  {menuItem.imageFile ? (
                    <img src={URL.createObjectURL(menuItem.imageFile)} alt="preview" className="max-h-28 object-contain" />
                  ) : (
                    "Drag & Drop file here or Click to choose"
                  )}


          
                  <input type="file" id="fileInput" name="imageFile" accept="image/*" onChange={handleChange} className="hidden" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-green-600 text-white">Save</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}




























