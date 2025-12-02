// src/redux/slices/restaurantsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // <-- Use shared axios instance

// 🟢 Base Restaurant API URL
const API = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"}`
console.log("Restaurant API:", API);

// =========================
//  FETCH ALL RESTAURANTS
// =========================
export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/restaurant`);

      if (res.status !== 200) {
        throw new Error("Failed to fetch restaurants");
      }
      console.log("Fetched Restaurants:", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Error fetching restaurants"
      );
    }
  }
);

// =========================
//  DELETE RESTAURANT
// =========================
export const deleteRestaurant = createAsyncThunk(
  "restaurant/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/restaurant/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Error deleting restaurant"
      );
    }
  }
);

// =========================
//  SLICE
// =========================
const initialState = {
  items: [],                     // list of restaurants
  loading: false,
  error: null,
};

// ========================
// 🔥 Slice
// ========================
const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    // manually set selected restaurant
    setSelectedRestaurant(state, action) {
      state.selectedRestaurantId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // ---- FETCH ----
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;

        // Backend returns { success, data: [...] }
        state.list = Array.isArray(action.payload?.data)
          ? action.payload.data
          : action.payload;
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---- DELETE ----
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r._id !== action.payload);
      });
  },
});

// ========================
// 🔥 Exports
// ========================
export const { setSelectedRestaurant } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
