import express from "express";
import upload from "../config/multer.js";
import {
  addMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getAllMenuItems);
router.get("/:menuId", getMenuItemById);

// Use Multer for file upload in POST and PUT
router.post("/", upload.single("image"), addMenuItem);
router.put("/:menuId", upload.single("image"), updateMenuItem);
router.delete("/:menuId", deleteMenuItem);

export default router;
