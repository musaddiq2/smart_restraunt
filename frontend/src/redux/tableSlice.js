// src/redux/tableSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tables";


// ===============================
// 🔵 FETCH TABLES
// ===============================
export const fetchTables = createAsyncThunk(
    "tables/fetchTables",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(API_URL, {
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load tables");
        }
    }
);


// ===============================
// 🟢 ADD TABLE
// ===============================
export const addTable = createAsyncThunk(
    "tables/addTable",
    async (tableData, thunkAPI) => {
        try {
            const res = await axios.post(API_URL, tableData, {
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add table");
        }
    }
);


// ===============================
// 🔴 DELETE TABLE
// ===============================
export const deleteTable = createAsyncThunk(
    "tables/deleteTable",
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`${API_URL}/${id}`, {
                withCredentials: true,
            });
            return id; // return deleted ID
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete table");
        }
    }
);


// ===============================
// 🟡 UPDATE TABLE (Edit Table Page)
// ===============================
export const updateTable = createAsyncThunk(
    "tables/updateTable",
    async ({ id, updatedData }, thunkAPI) => {
        try {
            const res = await axios.put(`${API_URL}/${id}`, updatedData, {
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update table");
        }
    }
);


// ===============================
// 🟣 TABLE SLICE
// ===============================
const tableSlice = createSlice({
    name: "tables",
    initialState: {
        tables: [],
        loading: false,
        error: null,
        // Analytics
        stats: {
            total: 0,
            available: 0,
            occupied: 0,
        },
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // ===== FETCH TABLES =====
            .addCase(fetchTables.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTables.fulfilled, (state, action) => {
                state.loading = false;
                state.tables = action.payload;

                // Analytics calculation
                state.stats.total = action.payload.length;
                state.stats.available = action.payload.filter(t => t.status === "Available").length;
                state.stats.occupied = action.payload.filter(t => t.status === "Occupied").length;
            })
            .addCase(fetchTables.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // ===== ADD TABLE =====
            .addCase(addTable.fulfilled, (state, action) => {
                state.tables.push(action.payload);

                // Update analytics
                state.stats.total += 1;
                if (action.payload.status === "Available") state.stats.available += 1;
                if (action.payload.status === "Occupied") state.stats.occupied += 1;
            })


            // ===== DELETE TABLE =====
            .addCase(deleteTable.fulfilled, (state, action) => {
                state.tables = state.tables.filter((t) => t._id !== action.payload);

                // Recalculate analytics
                state.stats.total = state.tables.length;
                state.stats.available = state.tables.filter(t => t.status === "Available").length;
                state.stats.occupied = state.tables.filter(t => t.status === "Occupied").length;
            })


            // ===== UPDATE TABLE =====
            .addCase(updateTable.fulfilled, (state, action) => {
                const index = state.tables.findIndex((t) => t._id === action.payload._id);
                if (index !== -1) state.tables[index] = action.payload;

                // Recalculate analytics
                state.stats.total = state.tables.length;
                state.stats.available = state.tables.filter(t => t.status === "Available").length;
                state.stats.occupied = state.tables.filter(t => t.status === "Occupied").length;
            });
    },
});

export default tableSlice.reducer;
