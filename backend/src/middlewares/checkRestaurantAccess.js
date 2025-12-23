// backend/src/middlewares/checkRestaurantAccess.js
import AdminRestaurant from "../models/adminRestaurantModel.js";

/**
 * Middleware to check if admin has access to a specific restaurant
 * Only applies to regular admins (superadmins bypass this)
 */
export const checkRestaurantAccess = async (req, res, next) => {
  try {
    // Superadmin has access to all restaurants
    if (req.user.role === "superadmin") {
      return next();
    }

    // Regular admin - check if they have access to this restaurant
    if (req.user.role === "admin") {
      const restaurantId = req.params.restaurantId || req.body.restaurantId || req.query.restaurantId;

      if (!restaurantId) {
        return res.status(400).json({
          success: false,
          message: "Restaurant ID is required",
        });
      }

      const assignment = await AdminRestaurant.findOne({
        adminId: req.user._id,
        restaurantId: restaurantId,
      });

      if (!assignment) {
        return res.status(403).json({
          success: false,
          message: "You don't have access to this restaurant",
        });
      }

      return next();
    }

    // Not an admin
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  } catch (error) {
    console.error("Error checking restaurant access:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Middleware to check admin permissions for specific actions
 */
export const checkPermission = (permission) => {
  return (req, res, next) => {
    // Superadmin has all permissions
    if (req.user.role === "superadmin") {
      return next();
    }

    // Regular admin - check specific permission
    if (req.user.role === "admin") {
      if (req.user.permissions && req.user.permissions[permission]) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: `You don't have permission to ${permission}`,
      });
    }

    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  };
};

