import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch Categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/categories");
      return res.data.categories;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Add Category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/categories",
        categoryData
      );
      return res.data.category;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/v1/categories/${id}`, data);
      return res.data.category;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Categories
    // builder.addCase(fetchCategories.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(fetchCategories.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.categories = action.payload;
    // });
    // builder.addCase(fetchCategories.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });




// Update Category
builder.addCase(updateCategory.pending, (state) => {
  state.loading = true;
  state.error = null;
});
builder.addCase(updateCategory.fulfilled, (state, action) => {
  state.loading = false;
  // update the category in the array
  const index = state.categories.findIndex(cat => cat._id === action.payload._id);
  if (index !== -1) state.categories[index] = action.payload;
});
builder.addCase(updateCategory.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});






    // Add Category
    builder.addCase(addCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default categorySlice.reducer;
