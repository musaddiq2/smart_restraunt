import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance"; // ✅ use shared axios instance

// 🟢 BASE URL FOR ALL TABLE APIs
const API = `${import.meta.env.VITE_API_BASE_URL}/tables`;
console.log("Tables API:", API);

// ========================
// FETCH ALL TABLES
// ========================
export const fetchTables = createAsyncThunk(
  "tables/fetchTables",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/tables");
      return res.data.data; // backend returns { success, data: [...] }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// ========================
// ADD TABLE
// ========================
export const addTable = createAsyncThunk(
  "tables/addTable",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/tables", payload);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// ========================
// UPDATE TABLE
// ========================
export const updateTable = createAsyncThunk(
  "tables/updateTable",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/tables/${id}`, updatedData);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// ========================
// DELETE TABLE
// ========================
export const deleteTable = createAsyncThunk(
  "tables/deleteTable",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/tables/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// ========================
// SLICE
// ========================
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
      // ---------------- FETCH ----------------
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

      // ---------------- ADD ----------------
      .addCase(addTable.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // ---------------- UPDATE ----------------
      .addCase(updateTable.fulfilled, (state, action) => {
        state.list = state.list.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      })

      // ---------------- DELETE ----------------
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export default tableSlice.reducer;
