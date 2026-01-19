// src/redux/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE = `${API_URL}/categories`;


// ===============================
// ✅ Fetch Categories
// ===============================
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_BASE);
      return res.data.categories;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ===============================
// ✅ Add Category
// ===============================
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_BASE, categoryData);
      return res.data.category;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ===============================
// ✅ Update Category
// ===============================
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, data);
      return res.data.category;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ===============================
// ✅ Toggle Active
// ===============================
export const toggleCategory = createAsyncThunk(
  "categories/toggleCategory",
  async ({ id, isActive }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, { isActive });
      return res.data.category;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ===============================
// ✅ Delete Category
// ===============================
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ===============================
// ✅ Slice
// ===============================
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // --------------------------
    // Fetch
    // --------------------------
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload || [];
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });

    // --------------------------
    // Add
    // --------------------------
    builder.addCase(addCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories.unshift(action.payload);
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });

    // --------------------------
    // Update
    // --------------------------
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      const updated = action.payload;
      const idx = state.categories.findIndex((c) => c._id === updated._id);
      if (idx !== -1) state.categories[idx] = updated;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });

    // --------------------------
    // Toggle Active
    // --------------------------
    builder.addCase(toggleCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(toggleCategory.fulfilled, (state, action) => {
      state.loading = false;
      const updated = action.payload;
      const idx = state.categories.findIndex((c) => c._id === updated._id);
      if (idx !== -1) state.categories[idx] = updated;
    });
    builder.addCase(toggleCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });

    // --------------------------
    // Delete
    // --------------------------
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      const id = action.payload;
      state.categories = state.categories.filter((c) => c._id !== id);
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
  },
});

export default categorySlice.reducer;
