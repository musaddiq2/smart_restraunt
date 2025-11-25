// src/redux/slices/menuSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/menus";

// =================== Async Thunks ===================

// Fetch all menus
export const fetchMenus = createAsyncThunk(
  "menu/fetchMenus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data?.data ?? res.data; // Support both {data} and raw array
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add new menu
export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (menuData, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASE_URL, menuData);
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update menu
export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete menu
export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Toggle menu availability
export const toggleMenu = createAsyncThunk(
  "menu/toggleMenu",
  async ({ id, isAvailable }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/${id}`, { isAvailable });
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// =================== Slice ===================

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menus: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMenuError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch menus
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload ?? [];
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      // Add menu
      .addCase(addMenu.fulfilled, (state, action) => {
        if (action.payload) state.menus.push(action.payload);
      })

      // Update menu
      .addCase(updateMenu.fulfilled, (state, action) => {
        const index = state.menus.findIndex((m) => m._id === action.payload._id);
        if (index >= 0) state.menus[index] = action.payload;
      })

      // Delete menu
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.menus = state.menus.filter((m) => m._id !== action.payload);
      })

      // Toggle menu
      .addCase(toggleMenu.fulfilled, (state, action) => {
        const index = state.menus.findIndex((m) => m._id === action.payload._id);
        if (index >= 0) state.menus[index] = action.payload;
      });
  },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;
