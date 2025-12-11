// src/controllers/tableController.js
import Table from "../models/tableModel.js";

// Create Table
export const addTable = async (req, res) => {
  try {
    const table = new Table(req.body);

    await table.save(); // Auto-generates tableId + menuURL

    res.status(201).json({
  success: true,
  message: "Table created successfully",
  table: table,    // FIX
});

  } catch (err) {
    console.error("Add Table Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Table
export const updateTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table)
      return res.status(404).json({ success: false, message: "Table not found" });

    table.tableNumber = req.body.tableNumber ?? table.tableNumber;
    table.seats = req.body.seats ?? table.seats;
    table.status = req.body.status ?? table.status;
    table.restaurantId = req.body.restaurantId ?? table.restaurantId;

    await table.save(); // Regenerates tableId + menuURL if needed

   res.status(200).json({
  success: true,
  message: "Table updated successfully",
  table: table,   // FIX
});

  } catch (err) {
    console.error("Update Table Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/// Fetch All Tables
export const getTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tables.length,
      tables: tables,   // IMPORTANT FIX
    });
  } catch (err) {
    console.error("Get Tables Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Table
export const getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table)
      return res.status(404).json({ success: false, message: "Table not found" });

    res.status(200).json({ success: true, data: table });
  } catch (err) {
    console.error("Get Table Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Table
export const deleteTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table)
      return res.status(404).json({ success: false, message: "Table not found" });

    res.status(200).json({
      success: true,
      message: "Table deleted successfully",
      deletedId: req.params.id,
    });
  } catch (err) {
    console.error("Delete Table Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
