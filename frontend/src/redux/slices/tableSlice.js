// src/redux/slices/tableSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"}/tables`;

// GET all tables
export const fetchTables = createAsyncThunk(
  "tables/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);

      // MUST return ONLY array
      return res.data.tables; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching tables");
    }
  }
);

// CREATE table
export const createTable = createAsyncThunk(
  "tables/create",
  async (tableData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, tableData);
      return res.data.table; // MUST be object
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating table");
    }
  }
);

// UPDATE table
export const updateTable = createAsyncThunk(
  "tables/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/${id}`, data);
      return res.data.table; // MUST be object
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating table");
    }
  }
);

// DELETE table
export const deleteTable = createAsyncThunk(
  "tables/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error deleting table");
    }
  }
);

const tableSlice = createSlice({
  name: "tables",
  initialState: {
    list: [],     // MUST BE ARRAY
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;  // ALWAYS array
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createTable.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update
      .addCase(updateTable.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list = state.list.map((t) =>
          t._id === updated._id ? updated : t
        );
      })

      // Delete
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export default tableSlice.reducer;
