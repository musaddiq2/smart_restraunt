import Restaurant from "../models/Restaurant.js";
import cloudinary from "../config/cloudinary.js";

export const addRestaurant = async (req, res) => {
  try {
    const { restaurantId, name, contact, type, address, openingTime, closingTime } = req.body;

    // Validate required fields
    if (!restaurantId || !name || !contact || !type || !address) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Check for duplicate restaurantId
    const existing = await Restaurant.findOne({ restaurantId });
    if (existing) {
      return res.status(400).json({ message: "Restaurant ID already exists!" });
    }

    // Cloudinary uploaded image URL
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path; // Multer-storage-cloudinary gives URL
    }

    const newRestaurant = await Restaurant.create({
      restaurantId,
      name,
      contact,
      type,
      address,
      openingTime,
      closingTime,
      restaurantImg: imageUrl,
    });

    return res.status(201).json({
      message: "Restaurant added successfully",
      restaurant: newRestaurant,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
