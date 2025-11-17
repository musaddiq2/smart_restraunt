import Restaurant from "../models/restaurantModel.js";

// ➕ ADD RESTAURANT
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
    } = req.body;

    const existing = await Restaurant.findOne({ restaurantId });
    if (existing) {
      return res.status(400).json({ message: "Restaurant ID already exists!" });
    }

    const newRestaurant = new Restaurant({
      restaurantId,
      name,
      contact,
      type,
      address,
      openingTime,
      closingTime,
      restaurantImg: req.file ? req.file.filename : null,
    });

    await newRestaurant.save();

    res.status(201).json({
      message: "Restaurant added successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 GET ALL RESTAURANTS
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 GET SINGLE
export const getRestaurant = async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.id);
    if (!r) return res.status(404).json({ message: "Restaurant not found" });

    res.json(r);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🛠 UPDATE
export const updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        restaurantImg: req.file ? req.file.filename : req.body.restaurantImg,
      },
      { new: true }
    );

    res.json({ message: "Updated", restaurant: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ DELETE
export const deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Restaurant removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
