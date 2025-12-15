<<<<<<< HEAD
import Table from "../models/tableModel.js";
import Restaurant from "../models/restaurantModel.js";
import { generateQRCodeDataUrl } from "../utils/qrUtil.js";

/* ===========================================================
   ⭐ GET ALL TABLES
   =========================================================== */
export const getTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    return res.json({ success: true, data: tables });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ===========================================================
   ⭐ ADD TABLE (with restaurant connection + QR)
   =========================================================== */
export const addTable = async (req, res) => {
  try {
    const {
      tableNumber,
      seats,
      status,
      restaurantId,      // NEW
      restaurantName,    // NEW
    } = req.body;

    // Ensure unique table number
    const exists = await Table.findOne({ tableNumber });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Table number already exists" });
    }

    // Validate restaurant ID
    const restaurant = await Restaurant.findOne({ restaurantId });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Invalid restaurant ID. Restaurant not found.",
      });
    }

    /* -----------------------------------------
       💥 QR Payload includes:
       - Restaurant ID
       - Table ID (once created)
       - Auto loading from frontend
       ----------------------------------------- */
    const tempQrPayload = `http://localhost:5173/menu/${restaurantId}/${tableNumber}`;

    // Generate QR
    const qrCodeDataUrl = await generateQRCodeDataUrl(tempQrPayload);

    const table = await Table.create({
      tableNumber,
      seats,
      status: status || "Available",
      restaurantName: restaurant.name,
      restaurantId: restaurant.restaurantId,
      qrCode: qrCodeDataUrl,
    });

    return res.status(201).json({ success: true, data: table });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ===========================================================
   ⭐ UPDATE TABLE (regenerate QR if changed)
   =========================================================== */
export const updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tableNumber,
      seats,
      status,
      restaurantId,     // NEW
    } = req.body;

    const table = await Table.findById(id);
    if (!table)
      return res
        .status(404)
        .json({ success: false, message: "Table not found" });

    /* -----------------------------------------
       Validate restaurant ID if updated
       ----------------------------------------- */
    if (restaurantId && restaurantId !== table.restaurantId) {
      const restaurant = await Restaurant.findOne({ restaurantId });
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Invalid restaurant ID. Restaurant not found.",
        });
      }

      table.restaurantId = restaurant.restaurantId;
      table.restaurantName = restaurant.name;
    }

    /* -----------------------------------------
       Regenerate QR if table number or restaurant changes
       ----------------------------------------- */
    if (
      tableNumber !== table.tableNumber ||
      restaurantId !== table.restaurantId
    ) {
      const qrPayload = `http://localhost:5173/menu/${
        restaurantId || table.restaurantId
      }/${tableNumber || table.tableNumber}`;

      table.qrCode = await generateQRCodeDataUrl(qrPayload);
    }

    // Update other fields
    table.tableNumber = tableNumber ?? table.tableNumber;
    table.seats = seats ?? table.seats;
    table.status = status ?? table.status;

    await table.save();

    return res.json({ success: true, data: table });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ===========================================================
   ⭐ DELETE TABLE
   =========================================================== */
export const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findById(id);

    if (!table)
      return res
        .status(404)
        .json({ success: false, message: "Table not found" });
    await table.remove();

    return res.json({ success: true, message: "Table deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
=======
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
>>>>>>> ceb071b784df9ecba6a675cee78975bfde35ff0b
  }
};
