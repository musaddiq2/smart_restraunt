// controllers/restaurantController.js
import Restaurant from "../models/Restaurant.js";

export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      data: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
