// src/redux/slices/restaurantsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"}/restaurant`;

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching restaurants");
    }
  }
);

export const deleteRestaurant = createAsyncThunk(
  "restaurants/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error deleting restaurant");
    }
  }
);

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    list: [],
    loading: false,
    error: null,
    selectedRestaurantId: null,
  },

  reducers: {
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
        state.list = action.payload;
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r._id !== action.payload);
      });
  },
});

export const { setSelectedRestaurant } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
