import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
console.log("API:", API);

// Fetch Restaurants
export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/restaurant`);
      if (res.status !== 200) {
        return rejectWithValue("Failed to fetch restaurants");
      }
      // Log for debugging
      console.log("Restaurants fetched:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      return rejectWithValue(err.response?.data?.message || err.message || "Error fetching restaurants");
    }
  }
);


// Delete Restaurant
export const deleteRestaurant = createAsyncThunk(
  "restaurant/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/restaurant/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error deleting");
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Handle different response formats
        // Backend returns array directly: [...]
        // Or wrapped: { success: true, data: [...] } or { restaurants: [...] }
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
        } else if (Array.isArray(action.payload?.data)) {
          state.list = action.payload.data;
        } else if (Array.isArray(action.payload?.restaurants)) {
          state.list = action.payload.restaurants;
        } else {
          state.list = [];
          console.warn("Unexpected restaurant response format:", action.payload);
        }
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r._id !== action.payload);
      });
  },
});

export default restaurantSlice.reducer;
