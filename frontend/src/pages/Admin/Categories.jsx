import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, addCategory, updateCategory, toggleCategory, deleteCategory } from "../../redux/slices/categorySlice";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  const [showModal, setShowModal] = useState(false);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [type, setType] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);

  // Search + Pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const openAddModal = () => {
    setEditingCategory(null);
    setMainCategory("");
    setSubCategory("");
    setType("");
    setIsActive(true);
    setShowModal(true);
  };

  const handleAddCategory = () => {
    dispatch(addCategory({ mainCategory, subCategory, type, isActive }))
      .unwrap()
      .then(() => {
        setShowModal(false);
        toast.success("Category added successfully!");
        resetForm();
      })
      .catch((err) => toast.error("Failed to add category"));
  };

  const handleEditClick = (cat) => {
    setEditingCategory(cat);
    setMainCategory(cat.mainCategory || "");
    setSubCategory(cat.subCategory || "");
    setType(cat.type || "");
    setIsActive(Boolean(cat.isActive));
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingCategory) {
      dispatch(updateCategory({ id: editingCategory._id, data: { mainCategory, subCategory, type, isActive } }))
        .unwrap()
        .then(() => {
          setShowModal(false);
          toast.success("Category updated successfully!");
          resetForm();
        })
        .catch(() => toast.error("Failed to update category"));
    } else {
      handleAddCategory();
    }
  };

  const handleToggle = (cat) => {
    const newStatus = !cat.isActive;
    dispatch(toggleCategory({ id: cat._id, isActive: newStatus }))
      .unwrap()
      .then(() => toast.success(`Category ${newStatus ? "activated" : "deactivated"}`))
      .catch(() => toast.error("Toggle failed"));
  };

  const handleDelete = (cat) => {
    if (!window.confirm(`Delete category "${cat.mainCategory} / ${cat.subCategory}"?`)) return;
    dispatch(deleteCategory(cat._id))
      .unwrap()
      .then(() => toast.success("Category deleted successfully!"))
      .catch(() => toast.error("Delete failed"));
  };

  const resetForm = () => {
    setEditingCategory(null);
    setMainCategory("");
    setSubCategory("");
    setType("");
    setIsActive(true);
  };

  // Filter + Pagination
  const filtered = categories.filter(
    (cat) =>
      cat.mainCategory.toLowerCase().includes(search.toLowerCase()) ||
      cat.subCategory.toLowerCase().includes(search.toLowerCase()) ||
      cat.type.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer position="top-right" autoClose={2500} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Categories</h1>
        <button
          onClick={openAddModal}
          style={{ background: "#10B981", color: "white", padding: "8px 14px", borderRadius: 6, border: "none", display: "flex", alignItems: "center", gap: 6 }}
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div style={{ margin: "12px 0" }}>
        <input
          placeholder="Search categories..."
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
              <th style={{ padding: 10, textAlign: "left" }}>Main Category</th>
              <th style={{ padding: 10, textAlign: "left" }}>Sub Category</th>
              <th style={{ padding: 10, textAlign: "left" }}>Type</th>
              <th style={{ padding: 10, textAlign: "left" }}>Active</th>
              <th style={{ padding: 10, textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 16, textAlign: "center" }}>No categories found</td>
              </tr>
            )}
            {paginated.map((cat, idx) => (
              <tr
                key={cat._id}
                style={{
                  background: idx % 2 === 0 ? "#fafafa" : "#fff",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
                onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#fafafa" : "#fff")}
              >
                <td style={{ padding: 10 }}>{cat.mainCategory}</td>
                <td style={{ padding: 10 }}>{cat.subCategory}</td>
                <td style={{ padding: 10 }}>{cat.type}</td>
                <td style={{ padding: 10 }}>
                  <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={Boolean(cat.isActive)} onChange={() => handleToggle(cat)} />
                    <span style={{ fontSize: 13 }}>{cat.isActive ? "Active" : "Inactive"}</span>
                  </label>
                </td>
                <td style={{ padding: 10, display: "flex", gap: 6 }}>
                  <button onClick={() => handleEditClick(cat)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(cat)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
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
            <h2 style={{ marginTop: 0 }}>{editingCategory ? "Edit Category" : "Add Category"}</h2>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Main Category</label>
              <input
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Sub Category</label>
              <input
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Type</label>
              <input
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={isActive} onChange={() => setIsActive((s) => !s)} />
                <span>{isActive ? "Active" : "Inactive"}</span>
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
