

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api"; // centralized axios instance

const BASE_URL = "/menus"; // API base endpoint (relative to axios baseURL)

// ==========================================
// 1) FETCH MENUS BY RESTAURANT
// ==========================================
export const fetchMenus = createAsyncThunk(
  "menu/fetchMenus",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const url = restaurantId ? `${BASE_URL}?restaurantId=${restaurantId}` : BASE_URL;
      const res = await API.get(url);
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ==========================================
// 2) ADD MENU
// ==========================================
export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (menuData, { rejectWithValue }) => {
    try {
      const res = await API.post(BASE_URL, menuData);
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ==========================================
// 3) UPDATE MENU
// ==========================================
export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`${BASE_URL}/${id}`, data);
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ==========================================
// 4) DELETE MENU
// ==========================================
export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ==========================================
// 5) TOGGLE MENU AVAILABILITY
// ==========================================
export const toggleMenu = createAsyncThunk(
  "menu/toggleMenu",
  async ({ id, isAvailable }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`${BASE_URL}/${id}`, { isAvailable });
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ==========================================
// SLICE
// ==========================================
const initialState = {
  menus: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
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
      .addCase(addMenu.rejected, (state, action) => {
        state.error = action.payload || action.error?.message;
      })

      // Update menu
      .addCase(updateMenu.fulfilled, (state, action) => {
        const index = state.menus.findIndex((m) => m._id === action.payload._id);
        if (index >= 0) state.menus[index] = action.payload;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.error = action.payload || action.error?.message;
      })

      // Delete menu
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.menus = state.menus.filter((m) => m._id !== action.payload);
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.error = action.payload || action.error?.message;
      })

      // Toggle menu
      .addCase(toggleMenu.fulfilled, (state, action) => {
        const index = state.menus.findIndex((m) => m._id === action.payload._id);
        if (index >= 0) state.menus[index] = action.payload;
      })
      .addCase(toggleMenu.rejected, (state, action) => {
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;