import Restaurant from "../models/restaurantModel.js";

/**
 * =====================================
 * ROLE & RESTAURANT OWNERSHIP CHECK
 * =====================================
 */
export const checkRestaurantPermission = (req, res, next) => {
  const user = req.user;
  const restaurantId =
    req.params.restaurantId ||
    req.body.restaurantId ||
    user?.restaurant;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!restaurantId) {
    return res.status(400).json({ message: "Restaurant ID missing" });
  }

  // SUPER ADMIN → full access
  if (user.role === "SUPER_ADMIN") {
    return next();
  }

  // RESTAURANT OWNER → only own restaurant
  if (
    user.role === "RESTAURANT_OWNER" &&
    user.restaurant?.toString() === restaurantId.toString()
  ) {
    return next();
  }

  return res.status(403).json({ message: "Access denied" });
};

/**
 * =====================================
 * SUBSCRIPTION STATUS CHECK
 * =====================================
 */
export const checkRestaurantSubscription = async (req, res, next) => {
  try {
    const restaurantId =
      req.params.restaurantId ||
      req.body.restaurantId ||
      req.user?.restaurant;

    if (!restaurantId) {
      return res.status(400).json({ message: "Restaurant ID missing" });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const { subscription } = restaurant;

    // ❌ No subscription
    if (!subscription || !subscription.planId) {
      return res.status(403).json({
        message: "No active subscription. Please purchase a plan.",
      });
    }

    const now = new Date();
    const expiryDate = new Date(subscription.expiryDate);

    // ✅ ACTIVE
    if (now <= expiryDate) {
      if (subscription.status !== "ACTIVE") {
        subscription.status = "ACTIVE";
        await restaurant.save();
      }

      req.restaurant = restaurant;
      return next();
    }

    // 🟡 GRACE PERIOD
    const graceEndDate = new Date(expiryDate);
    graceEndDate.setDate(
      graceEndDate.getDate() + (subscription.gracePeriodDays || 0)
    );

    if (now <= graceEndDate) {
      if (subscription.status !== "GRACE") {
        subscription.status = "GRACE";
        await restaurant.save();
      }

      return res.status(403).json({
        message: `Subscription expired. Grace period until ${graceEndDate.toDateString()}`,
      });
    }

    // 🔴 DISABLED
    if (subscription.status !== "DISABLED") {
      subscription.status = "DISABLED";
      await restaurant.save();
    }

    return res.status(403).json({
      message: "Subscription expired. Please renew.",
    });
  } catch (error) {
    console.error("Subscription check error:", error);
    return res.status(500).json({ message: "Subscription check failed" });
  }
};

/**
 * =====================================
 * FEATURE / PERMISSION CHECK
 * Middleware Factory
 * =====================================
 */
export const checkPermission = (permissionKey) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // SUPER ADMIN → all permissions
    if (user.role === "SUPER_ADMIN") {
      return next();
    }

    // Permission check
    if (!user.permissions || user.permissions[permissionKey] !== true) {
      return res.status(403).json({
        message: `Permission denied: ${permissionKey}`,
      });
    }

    next();
  };
};
