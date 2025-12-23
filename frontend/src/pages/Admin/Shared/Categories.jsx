import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  toggleCategory,
  deleteCategory,
} from "../../../redux/slices/categorySlice";

import { Plus, Edit2, Trash2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  const [showModal, setShowModal] = useState(false);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [type, setType] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const openAddModal = () => {
    setEditingCategory(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setMainCategory("");
    setSubCategory("");
    setType("");
    setIsActive(true);
  };

  const handleSave = () => {
    if (editingCategory) {
      dispatch(
        updateCategory({
          id: editingCategory._id,
          data: { mainCategory, subCategory, type, isActive },
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Category updated successfully!");
          setShowModal(false);
        })
        .catch(() => toast.error("Failed to update category"));
    } else {
      dispatch(addCategory({ mainCategory, subCategory, type, isActive }))
        .unwrap()
        .then(() => {
          toast.success("Category added successfully!");
          setShowModal(false);
        })
        .catch(() => toast.error("Failed to add category"));
    }
  };

  const handleEditClick = (cat) => {
    setEditingCategory(cat);
    setMainCategory(cat.mainCategory);
    setSubCategory(cat.subCategory);
    setType(cat.type);
    setIsActive(cat.isActive);
    setShowModal(true);
  };

  const handleToggle = (cat) => {
    const newStatus = !cat.isActive;
    dispatch(toggleCategory({ id: cat._id, isActive: newStatus }))
      .unwrap()
      .then(() => toast.success(`Category ${newStatus ? "activated" : "deactivated"}`))
      .catch(() => toast.error("Toggle failed"));
  };

  const handleDelete = (cat) => {
    if (!window.confirm(`Delete category "${cat.mainCategory}/${cat.subCategory}"?`)) return;

    dispatch(deleteCategory(cat._id))
      .unwrap()
      .then(() => toast.success("Category deleted successfully!"))
      .catch(() => toast.error("Delete failed"));
  };

  // Search + Pagination
  const filtered = categories.filter(
    (cat) =>
      cat.mainCategory.toLowerCase().includes(search.toLowerCase()) ||
      cat.subCategory.toLowerCase().includes(search.toLowerCase()) ||
      cat.type.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2500} />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Category Management</h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow transition"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Main Category</th>
              <th className="px-6 py-3 text-left">Sub Category</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-500">
                  No categories found.
                </td>
              </tr>
            )}

            {paginated.map((cat, idx) => (
              <tr
                key={cat._id}
                className="hover:bg-green-50 border-b last:border-none transition"
              >
                <td className="px-6 py-4">{cat.mainCategory}</td>
                <td className="px-6 py-4">{cat.subCategory}</td>
                <td className="px-6 py-4">{cat.type}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cat.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {cat.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-4">
                  <button
                    onClick={() => handleEditClick(cat)}
                    className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition"
                  >
                    <Edit2 size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(cat)}
                    className="p-2 rounded-full hover:bg-red-50 text-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cat.isActive}
                      onChange={() => handleToggle(cat)}
                    />
                    <span className="text-xs">{cat.isActive ? "On" : "Off"}</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg border transition ${
                page === i + 1
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

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
            className="bg-white p-6 rounded-2xl w-[400px] shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Main Category"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border"
              />

              <input
                placeholder="Sub Category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border"
              />

              <input
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
                <span>{isActive ? "Active" : "Inactive"}</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-green-600 text-white shadow"
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
