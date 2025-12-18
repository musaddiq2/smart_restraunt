import Restaurant from "../models/restaurantModel.js";
import cloudinary from "../config/cloudinary.js";

/* ===========================================================
   ⭐ GET ALL RESTAURANTS
=========================================================== */
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ===========================================================
   ⭐ NEW — GET RESTAURANT BY restaurantId  
=========================================================== */
export const getRestaurantByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findOne({ restaurantId });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ===========================================================
   ⭐ GET RESTAURANT BY MongoDB _id  
=========================================================== */
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ===========================================================
   ⭐ ADD RESTAURANT
=========================================================== */
export const addRestaurant = async (req, res) => {
  try {
    const {
      restaurantId,
      name,
      contact,
      type,
      address,
      openingTime,
      closingTime,
      email,
      status,
    } = req.body;

    const existing = await Restaurant.findOne({ restaurantId });
    if (existing) {
      return res.status(400).json({
        message: "Restaurant ID already exists!",
      });
    }

    const newRestaurant = new Restaurant({
      restaurantId,
      name,
      contact,
      type,
      address,
      openingTime,
      closingTime,
      email,
      status: status ?? "Active",
      restaurantImg: req.file ? req.file.path : null,
    });

    await newRestaurant.save();

    return res.status(201).json({
      message: "Restaurant added successfully",
      restaurant: newRestaurant,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

/* ===========================================================
   ⭐ EDIT RESTAURANT
=========================================================== */
export const editRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    /* 🔥 DELETE OLD IMAGE ONLY IF NEW ONE IS UPLOADED */
    if (req.file && restaurant.restaurantImg) {
      try {
        const parts = restaurant.restaurantImg.split("/restaurants/");
        const publicId = "restaurants/" + parts[1].split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Cloudinary delete failed:", error.message);
      }
    }

    /* 🔄 UPDATE FIELDS */
    restaurant.restaurantId = req.body.restaurantId || restaurant.restaurantId;
    restaurant.name = req.body.name || restaurant.name;
    restaurant.contact = req.body.contact || restaurant.contact;
    restaurant.type = req.body.type || restaurant.type;
    restaurant.address = req.body.address || restaurant.address;
    restaurant.openingTime = req.body.openingTime || restaurant.openingTime;
    restaurant.closingTime = req.body.closingTime || restaurant.closingTime;
    restaurant.email = req.body.email || restaurant.email;
    restaurant.status = req.body.status || restaurant.status;

    /* 🖼 UPDATE IMAGE */
    restaurant.restaurantImg = req.file ? req.file.path : restaurant.restaurantImg;

    await restaurant.save();

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

/* ===========================================================
   ⭐ DELETE RESTAURANT
=========================================================== */
export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    /* 🔥 DELETE IMAGE FROM CLOUDINARY */
    if (restaurant.restaurantImg) {
      try {
        const parts = restaurant.restaurantImg.split("/restaurants/");
        const publicId = "restaurants/" + parts[1].split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Cloudinary delete failed:", error.message);
      }
    }

    await Restaurant.findByIdAndDelete(id);

    res.status(200).json({
      message: "Restaurant deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
