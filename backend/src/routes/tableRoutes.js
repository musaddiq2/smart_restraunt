import express from "express";
import {
  getTables,
  getTableById,
  addTable,
  updateTable,
  deleteTable,
} from "../controllers/tableController.js";

const router = express.Router();

// GET all tables
router.get("/", getTables);

// GET a single table
router.get("/:id", getTableById);

// CREATE table
router.post("/", addTable);

// UPDATE table
router.put("/:id", updateTable);

// DELETE table
router.delete("/:id", deleteTable);

export default router;
