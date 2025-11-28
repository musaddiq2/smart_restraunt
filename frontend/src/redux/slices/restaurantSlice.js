// src/redux/slices/restaurantsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ========================
// 🔥 Fetch Restaurants API
// ========================
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/restaurants");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching restaurants");
    }
  }
);

// ========================
// 🔥 Initial State
// ========================
const initialState = {
  items: [],                     // list of restaurants
  loading: false,
  error: null,
  selectedRestaurantId: "",      // super admin selected restaurant
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
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;

        // Auto-select first restaurant if none selected
        if (!state.selectedRestaurantId && action.payload?.length > 0) {
          state.selectedRestaurantId = action.payload[0]._id;
        }
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ========================
// 🔥 Exports
// ========================
export const { setSelectedRestaurant } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
