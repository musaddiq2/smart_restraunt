import express from "express";
import {
  addTable,
  getTables,
  updateTable,
  deleteTable,
} from "../controllers/tableController.js";
// optionally protect with auth middleware if needed
// import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ---------------- TABLE ROUTES ----------------

/**
 * GET all tables
 */
router.get("/", getTables);

/**
 * ADD a new table
 * Supports: restaurantId, restaurantName, QR auto-generation
 */
router.post("/", addTable);

/**
 * UPDATE table by ID
 */
router.put("/:id", updateTable);

/**
 * DELETE table by ID
 */
router.delete("/:id", deleteTable);

export default router;
