import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔥 Fetch restaurants from backend
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

// 🔥 Initial State ALWAYS MUST HAVE list/loading/error
const initialState = {
  list: [],
  loading: false,
  error: null
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default restaurantSlice.reducer;
