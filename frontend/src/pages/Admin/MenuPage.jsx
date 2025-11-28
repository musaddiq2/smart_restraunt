// src/pages/Admin/MenuPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMenus,
  addMenu,
  updateMenu,
  toggleMenu,
  deleteMenu,
} from "../../redux/slices/menuSlice";
import { fetchRestaurants, setSelectedRestaurant } from "../../redux/slices/restaurantSlice";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages", "Others"];

export default function MenuPage() {
  const dispatch = useDispatch();
  const { menus, loading: menuLoading, error: menuError } = useSelector((state) => state.menu);
  const { items: restaurants, loading: restLoading, selectedRestaurantId } = useSelector((state) => state.restaurants);

  const [showModal, setShowModal] = useState(false);
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

  // UI filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // 1) load restaurants (for dropdown)
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // 2) whenever selectedRestaurantId changes, fetch menus for that restaurant
  useEffect(() => {
    if (selectedRestaurantId) {
      dispatch(fetchMenus(selectedRestaurantId));
    }
  }, [dispatch, selectedRestaurantId]);

  // When restaurants list first loads, restaurantsSlice auto-selects the first; ensure menuItem.restaurantId sync
  useEffect(() => {
    if (selectedRestaurantId) {
      setMenuItem((prev) => ({ ...prev, restaurantId: selectedRestaurantId }));
    }
  }, [selectedRestaurantId]);

  const handleRestaurantChange = (e) => {
    const id = e.target.value;
    dispatch(setSelectedRestaurant(id));
    // fetchMenus will be dispatched by the useEffect above
  };

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenuItem((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = () => {
    if (!menuItem.name || !menuItem.price || !menuItem.restaurantId) {
      toast.error("Name, Price and Restaurant are required");
      return;
    }

    if (editingMenu) {
      dispatch(updateMenu({ id: editingMenu._id, data: menuItem }))
        .unwrap()
        .then(() => {
          toast.success("Menu item updated successfully!");
          setShowModal(false);
        })
        .catch(() => toast.error("Update failed"));
    } else {
      dispatch(addMenu(menuItem))
        .unwrap()
        .then(() => {
          toast.success("Menu item added successfully!");
          setShowModal(false);
        })
        .catch(() => toast.error("Add failed"));
    }
  };

  const handleEdit = (item) => {
    setEditingMenu(item);
    setMenuItem({
      restaurantId: item.restaurantId || selectedRestaurantId,
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "Others",
      image: item.image || "",
      isAvailable: item.isAvailable ?? true,
      veg: item.veg ?? true,
    });
    setShowModal(true);
  };

  const handleToggle = (item) => {
    dispatch(toggleMenu({ id: item._id, isAvailable: !item.isAvailable }))
      .unwrap()
      .then(() => toast.success("Availability updated"))
      .catch(() => toast.error("Toggle failed"));
  };

  const handleDelete = (item) => {
    if (!window.confirm(`Delete menu item "${item.name}"?`)) return;
    dispatch(deleteMenu(item._id))
      .unwrap()
      .then(() => toast.success("Menu item deleted"))
      .catch(() => toast.error("Delete failed"));
  };

  // filters & pagination
  const filtered = (menus || []).filter((item) => {
    if (selectedCategory !== "All" && (item.category || "") !== selectedCategory) return false;
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (item.name || "").toLowerCase().includes(q) || (item.description || "").toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ padding: 20 }}>
      <ToastContainer position="top-right" autoClose={2000} />

      <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <label style={{ fontWeight: 600 }}>Restaurant:</label>
          <select value={selectedRestaurantId || ""} onChange={handleRestaurantChange} style={{ padding: 8, borderRadius: 6 }}>
            {restLoading && <option>Loading...</option>}
            {!restLoading && restaurants.map((r) => <option key={r._id} value={r._id}>{r.name}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "1px solid #ddd", width: 240 }}
          />
          <button onClick={openAddModal} style={{ display: "flex", alignItems: "center", gap: 8, background: "#10B981", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6 }}>
            <Plus size={16} /> Add Menu Item
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {/* category tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setPage(1); }}
              style={{
                padding: "6px 10px",
                borderRadius: 20,
                border: selectedCategory === cat ? "1px solid #10B981" : "1px solid #ddd",
                background: selectedCategory === cat ? "#10B981" : "#fff",
                color: selectedCategory === cat ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7fafc" }}>
                <th style={{ padding: 10, textAlign: "left" }}>Name</th>
                <th style={{ padding: 10, textAlign: "left" }}>Category</th>
                <th style={{ padding: 10, textAlign: "left" }}>Price</th>
                <th style={{ padding: 10, textAlign: "left" }}>Available</th>
                <th style={{ padding: 10, textAlign: "left" }}>Veg</th>
                <th style={{ padding: 10, textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 16, textAlign: "center" }}>
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
                    <input type="checkbox" checked={Boolean(item.isAvailable)} onChange={() => handleToggle(item)} />
                  </td>
                  <td style={{ padding: 10 }}>{item.veg ? "Veg" : "Non-Veg"}</td>
                  <td style={{ padding: 10, display: "flex", gap: 8 }}>
                    <button onClick={() => handleEdit(item)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(item)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                      <Trash2 size={16} color="#b91c1c" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        {totalPages > 1 && (
          <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 6 }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} style={{
                padding: "6px 10px",
                borderRadius: 4,
                border: page === i + 1 ? "1px solid #10B981" : "1px solid #ddd",
                background: page === i + 1 ? "#10B981" : "#fff",
                color: page === i + 1 ? "#fff" : "#000",
                cursor: "pointer",
              }}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* modal */}
      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 50 }}>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} style={{ width: 460, background: "#fff", padding: 18, borderRadius: 8 }}>
            <h2 style={{ marginTop: 0 }}>{editingMenu ? "Edit Menu Item" : "Add Menu Item"}</h2>

            {/* Restaurant select (readonly in modal but shown) */}
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Restaurant</label>
              <select name="restaurantId" value={menuItem.restaurantId} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}>
                {restaurants.map((r) => <option key={r._id} value={r._id}>{r.name}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Name</label>
              <input name="name" value={menuItem.name} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Description</label>
              <input name="description" value={menuItem.description} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Price</label>
              <input type="number" name="price" value={menuItem.price} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Category</label>
              <select name="category" value={menuItem.category} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}>
                <option>Starters</option>
                <option>Main Course</option>
                <option>Desserts</option>
                <option>Beverages</option>
                <option>Others</option>
              </select>
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Image URL</label>
              <input name="image" value={menuItem.image} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
            </div>

            <div style={{ marginBottom: 8, display: "flex", gap: 12 }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" name="isAvailable" checked={menuItem.isAvailable} onChange={handleChange} />
                Available
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" name="veg" checked={menuItem.veg} onChange={handleChange} />
                Veg
              </label>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ddd", background: "#fff" }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: "8px 12px", borderRadius: 6, background: "#0ea5a0", color: "#fff", border: "none" }}>Save</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
