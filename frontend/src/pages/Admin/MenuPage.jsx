import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus, addMenu, updateMenu, toggleMenu, deleteMenu } from "../../redux/slices/menuSlice";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MenuPage() {
  const dispatch = useDispatch();
  const { menus, loading, error } = useSelector((state) => state.menu);

  const [showModal, setShowModal] = useState(false);
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "Others",
    image: "",
    isAvailable: true,
    veg: true,
  });
  const [editingMenu, setEditingMenu] = useState(null);

  // Search + Pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const openAddModal = () => {
    setEditingMenu(null);
    setMenuItem({
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
    setMenuItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
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

  const handleToggle = (item) => {
    dispatch(toggleMenu({ id: item._id, isAvailable: !item.isAvailable }))
      .unwrap()
      .then(() => toast.success(`Menu item ${!item.isAvailable ? "available" : "unavailable"}`))
      .catch(() => toast.error("Toggle failed"));
  };

  const handleDelete = (item) => {
    if (!window.confirm(`Delete menu item "${item.name}"?`)) return;
    dispatch(deleteMenu(item._id))
      .unwrap()
      .then(() => toast.success("Menu item deleted successfully!"))
      .catch(() => toast.error("Delete failed"));
  };

  // Filter + Pagination
  const filtered = menus.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer position="top-right" autoClose={2500} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Menu Items</h1>
        <button
          onClick={openAddModal}
          style={{
            background: "#10B981",
            color: "white",
            padding: "8px 14px",
            borderRadius: 6,
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Plus size={16} /> Add Menu Item
        </button>
      </div>

      <div style={{ margin: "12px 0" }}>
        <input
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, width: "100%", borderRadius: 6, border: "1px solid #ddd" }}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {JSON.stringify(error)}</p>}

      <div style={{ marginTop: 12, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f7fafc" }}>
              <th style={{ padding: 10, textAlign: "left" }}>Name</th>
              <th style={{ padding: 10, textAlign: "left" }}>Description</th>
              <th style={{ padding: 10, textAlign: "left" }}>Price</th>
              <th style={{ padding: 10, textAlign: "left" }}>Category</th>
              <th style={{ padding: 10, textAlign: "left" }}>Available</th>
              <th style={{ padding: 10, textAlign: "left" }}>Veg</th>
              <th style={{ padding: 10, textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: 16, textAlign: "center" }}>
                  No menu items found
                </td>
              </tr>
            )}
            {paginated.map((item, idx) => (
              <tr
                key={item._id}
                style={{
                  background: idx % 2 === 0 ? "#fafafa" : "#fff",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
                onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#fafafa" : "#fff")}
              >
                <td style={{ padding: 10 }}>{item.name}</td>
                <td style={{ padding: 10 }}>{item.description}</td>
                <td style={{ padding: 10 }}>{item.price}</td>
                <td style={{ padding: 10 }}>{item.category}</td>
                <td style={{ padding: 10 }}>
                  <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={Boolean(item.isAvailable)} onChange={() => handleToggle(item)} />
                    <span style={{ fontSize: 13 }}>{item.isAvailable ? "Yes" : "No"}</span>
                  </label>
                </td>
                <td style={{ padding: 10 }}>
                  {item.veg ? "Veg" : "Non-Veg"}
                </td>
                <td style={{ padding: 10, display: "flex", gap: 6 }}>
                  <button onClick={() => handleEdit(item)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                    <Trash2 size={16} color="#b91c1c" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 6 }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                padding: "6px 10px",
                borderRadius: 4,
                border: page === i + 1 ? "1px solid #10B981" : "1px solid #ddd",
                background: page === i + 1 ? "#10B981" : "#fff",
                color: page === i + 1 ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Animated Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            style={{ width: 420, background: "#fff", padding: 18, borderRadius: 8 }}
          >
            <h2 style={{ marginTop: 0 }}>{editingMenu ? "Edit Menu Item" : "Add Menu Item"}</h2>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Name</label>
              <input
                name="name"
                value={menuItem.name}
                onChange={handleChange}
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Description</label>
              <input
                name="description"
                value={menuItem.description}
                onChange={handleChange}
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Price</label>
              <input
                type="number"
                name="price"
                value={menuItem.price}
                onChange={handleChange}
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Category</label>
              <select
                name="category"
                value={menuItem.category}
                onChange={handleChange}
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
              >
                <option>Starters</option>
                <option>Main Course</option>
                <option>Desserts</option>
                <option>Beverages</option>
                <option>Others</option>
              </select>
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Image URL</label>
              <input
                name="image"
                value={menuItem.image}
                onChange={handleChange}
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
              />
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
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ddd", background: "#fff" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{ padding: "8px 12px", borderRadius: 6, background: "#0ea5a0", color: "#fff", border: "none" }}
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
