import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories, addCategory } from "../redux/slices/categorySlice";
import { fetchCategories, addCategory } from "../../redux/slices/categorySlice"; // correct path


export default function Categories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  const [showModal, setShowModal] = useState(false);

  // Form fields
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [type, setType] = useState("");
  const [isActive, setIsActive] = useState(true);




  


  // State for edit
const [editingCategory, setEditingCategory] = useState(null);

// Open modal for edit
const handleEditClick = (cat) => {
  setEditingCategory(cat);
  setMainCategory(cat.mainCategory);
  setSubCategory(cat.subCategory);
  setType(cat.type);
  setIsActive(cat.isActive);
  setShowModal(true);
};

// Save (Add or Edit)
const handleSave = () => {
  if (editingCategory) {
    dispatch(updateCategory({
      id: editingCategory._id,
      data: { mainCategory, subCategory, type, isActive }
    }))
    .unwrap()
    .then(() => {
      setShowModal(false);
      setEditingCategory(null);
      setMainCategory("");
      setSubCategory("");
      setType("");
      setIsActive(true);
    })
    .catch((err) => console.log("Error updating category:", err));
  } else {
    handleAddCategory(); // existing add
  }
};








  

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    dispatch(addCategory({ mainCategory, subCategory, type, isActive }))
      .unwrap() // to catch errors if needed
      .then(() => {
        setShowModal(false);
        setMainCategory("");
        setSubCategory("");
        setType("");
        setIsActive(true);
      })
      .catch((err) => {
        console.log("Error adding category:", err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Categories</h1>

      {/* Add Button */}
      <button
        style={{
          background: "green",
          color: "white",
          padding: "8px 16px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
        onClick={() => setShowModal(true)}
      >
        + Add Category
      </button>

      {/* Loading / Error */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Table */}
      <table
        border="4"
        width="100%"
        cellPadding="10"
        style={{ borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>Main Category</th>
            <th>Sub Category</th>
            <th>Type</th>
            <th>Active</th>
          </tr>
        </thead>

        {/* <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.mainCategory}</td>
              <td>{cat.subCategory}</td>
              <td>{cat.type}</td>
              <td>{cat.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody> */}





<tbody>
  {categories.map((cat) => (
    <tr key={cat._id}>
      <td>{cat.mainCategory}</td>
      <td>{cat.subCategory}</td>
      <td>{cat.type}</td>
      <td>{cat.isActive ? "Active" : "Inactive"}</td>
      <td>
        <button
          style={{ marginRight: "5px" }}
          onClick={() => handleEditClick(cat)}
        >
          Edit
        </button>
        {/* Delete button later */}
      </td>
    </tr>
  ))}
</tbody>






      </table>

      {/* POPUP Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              width: "350px",
              borderRadius: "8px",
            }}
          >
            <h2>Add Category</h2>

            <label>Main Category</label>
            <input
              type="text"
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Sub Category</label>
            <input
              type="text"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />{" "}
              Active
            </label>

            <br />
            <br />

            {/* <button
              style={{
                background: "blue",
                color: "white",
                padding: "8px 16px",
                marginRight: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleAddCategory}
            >
              Save
            </button> */}



            <button
  style={{
    background: "blue",
    color: "white",
    padding: "8px 16px",
    marginRight: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  }}
  onClick={handleSave} // handle both add & edit
>
  Save
</button>


            <button
              style={{
                background: "gray",
                color: "white",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
