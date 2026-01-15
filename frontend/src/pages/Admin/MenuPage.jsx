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
import {
  fetchRestaurants,
  setSelectedRestaurant,
} from "../../redux/slices/restaurantsSlice";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gsap } from "gsap";

export default function MenuPage() {
  const dispatch = useDispatch();

  const { menus = [], error: menuError } = useSelector(
    (state) => state.menu
  );
  const {
    list: restaurants = [],
    selectedRestaurantId,
  } = useSelector((state) => state.restaurants);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [editingMenu, setEditingMenu] = useState(null);

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

  // ================= FETCH RESTAURANTS =================
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // ================= DEFAULT RESTAURANT =================
  useEffect(() => {
    if (restaurants.length && !selectedRestaurantId) {
      dispatch(setSelectedRestaurant(restaurants[0]._id));
    }
  }, [restaurants, selectedRestaurantId, dispatch]);

  // ================= FETCH MENUS (FIXED) =================
  useEffect(() => {
    if (!selectedRestaurantId) return;

    dispatch(fetchMenus(selectedRestaurantId));
    setMenuItem((prev) => ({
      ...prev,
      restaurantId: selectedRestaurantId,
    }));
  }, [selectedRestaurantId, dispatch]);

  // ================= ERROR =================
  useEffect(() => {
    if (menuError) {
      toast.error(menuError);
      dispatch(clearMenuError());
    }
  }, [menuError, dispatch]);

  // ================= GSAP =================
  useEffect(() => {
    if (!rowsRef.current.length) return;
    gsap.fromTo(
      rowsRef.current,
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05 }
    );
  }, [menus, search, typeFilter, statusFilter, sortBy]);

  const addRowRef = (el) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  // ================= FORM =================
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "imageFile") {
      if (files && files[0]) {
        setMenuItem((p) => ({ ...p, imageFile: files[0] }));
      }
    } else {
      setMenuItem((p) => ({
        ...p,
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

  // ================= ADD / UPDATE (FIXED) =================
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
    formData.append("isAvailable", String(menuItem.isAvailable));
    formData.append("veg", String(menuItem.veg));
    if (menuItem.imageFile) {
      formData.append("image", menuItem.imageFile);
    }

    const action = editingMenu
      ? updateMenu({ id: editingMenu._id, data: formData })
      : addMenu(formData);

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(editingMenu ? "Menu updated!" : "Menu added!");
        setShowModal(false);
        resetForm();
        dispatch(fetchMenus(selectedRestaurantId));
      })
      .catch(() => toast.error("Operation failed"));
  };

  // ================= EDIT (FIXED) =================
  const handleEdit = (item) => {
    setEditingMenu(item);
    setMenuItem({
      restaurantId: item.restaurantId?._id || item.restaurantId,
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

  // ================= TOGGLE (FIXED) =================
  const handleToggle = (item) => {
    dispatch(
      toggleMenu({
        id: item._id,
        data: { isAvailable: !item.isAvailable },
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Status updated");
        dispatch(fetchMenus(selectedRestaurantId));
      })
      .catch(() => toast.error("Toggle failed"));
  };

  // ================= DELETE =================
  const handleDelete = (item) => {
    if (!window.confirm(`Delete "${item.name}"?`)) return;

    dispatch(deleteMenu(item._id))
      .unwrap()
      .then(() => {
        toast.success("Deleted successfully");
        dispatch(fetchMenus(selectedRestaurantId));
      })
      .catch(() => toast.error("Delete failed"));
  };

  // ================= FILTER =================
  const filteredMenus = useMemo(() => {
    let data = Array.isArray(menus) ? [...menus] : [];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (i) =>
          i.name?.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "All") {
      data = data.filter(
        (i) => (i.veg ? "Veg" : "Non-Veg") === typeFilter
      );
    }

    if (statusFilter !== "All") {
      data = data.filter((i) =>
        statusFilter === "Available" ? i.isAvailable : !i.isAvailable
      );
    }

    if (sortBy === "az") data.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "za") data.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "newest")
      data.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

    return data;
  }, [menus, search, typeFilter, statusFilter, sortBy]);

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2500} />
      {/* UI & JSX REMAINS EXACTLY THE SAME AS YOUR ORIGINAL */}
    </div>
  );
}







































