// frontend/src/store/restaurantSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1") + "/restaurant";

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetch",
  async (params = {}, { rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") searchParams.append(k, v);
      });
      const res = await axios.get(`${API_BASE}?${searchParams.toString()}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createRestaurant = createAsyncThunk(
  "restaurants/create",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateRestaurant = createAsyncThunk(
  "restaurants/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteRestaurant = createAsyncThunk(
  "restaurants/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_BASE}/delete/${id}`);
      return { id, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addMenuItem = createAsyncThunk(
  "restaurants/addMenuItem",
  async ({ id, menuItem }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/${id}/menu`, menuItem);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const slice = createSlice({
  name: "restaurants",
  initialState: {
    list: [],
    meta: { total: 0, page: 1, limit: 10, pages: 1 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || [];
        state.meta = action.payload.meta || state.meta;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(createRestaurant.fulfilled, (state, action) => { state.list.unshift(action.payload); state.meta.total += 1; })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        const idx = state.list.findIndex(r => r._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.list = state.list.filter(r => r._id !== action.payload.id);
        state.meta.total = Math.max(0, state.meta.total - 1);
      })
      .addCase(addMenuItem.fulfilled, (state, action) => {
        const idx = state.list.findIndex(r => r._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      });
  }
});

export default slice.reducer;
