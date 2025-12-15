import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
const API_BASE = `${API}/tables`;

// Fetch all tables
export const fetchTables = createAsyncThunk(
  "tables/fetchTables",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_BASE);
      return res.data.data || res.data; // Handle both response formats
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add a table
export const addTable = createAsyncThunk(
  "tables/addTable",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(API_BASE, payload);
      return res.data.data || res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update table
export const updateTable = createAsyncThunk(
  "tables/updateTable",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, updatedData);
      return res.data.data || res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete table
export const deleteTable = createAsyncThunk(
  "tables/deleteTable",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const tableSlice = createSlice({
  name: "tables",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addTable.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // update
      .addCase(updateTable.fulfilled, (state, action) => {
        state.list = state.list.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      })

      // delete
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export default tableSlice.reducer;
