import MenuItem from "../models/menuModal.js";
import cloudinary from "../config/cloudinary.js";
// Add new menu item (Admin)
export const addMenuItem = async (req, res) => {
  try {
    let imageUrl = "";

    // If an image file is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "menuItems", // optional folder
      });
      imageUrl = result.secure_url;
    }

    const menuItem = new MenuItem({
      ...req.body,
      image: imageUrl,
    });

    await menuItem.save();
    res.status(201).json({ success: true, data: menuItem });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all menu items (Public/Admin with category filter)
export const getAllMenuItems = async (req, res) => {
  try {
    const { category, restaurantId } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (restaurantId) filter.restaurantId = restaurantId;

    const menuItems = await MenuItem.find(filter);
    res.status(200).json({ success: true, data: menuItems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single menu item
export const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.menuId);
    if (!menuItem)
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    res.status(200).json({ success: true, data: menuItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update menu item (Admin)
export const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.menuId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!menuItem)
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    res.status(200).json({ success: true, data: menuItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete menu item (Admin)
export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.menuId);
    if (!menuItem)
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    res
      .status(200)
      .json({ success: true, message: "Menu item deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
