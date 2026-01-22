import cron from "node-cron";
import Restaurant from "../models/restaurantModel.js";

/**
 * Runs every day at 12:00 AM
 * Checks subscription expiry & grace period
 */
cron.schedule("0 0 * * *", async () => {
  console.log("🔁 Running subscription expiry cron job...");

  try {
    const restaurants = await Restaurant.find({
      "subscription.planId": { $exists: true },
    });

    const now = new Date();

    for (const restaurant of restaurants) {
      const sub = restaurant.subscription;

      if (!sub || !sub.expiryDate) continue;

      const expiryDate = new Date(sub.expiryDate);

      // 🟢 Active
      if (now <= expiryDate) {
        if (sub.status !== "ACTIVE") {
          sub.status = "ACTIVE";
          await restaurant.save();
        }
        continue;
      }

      // 🟡 Grace Period
      const graceEnd = new Date(expiryDate);
      graceEnd.setDate(graceEnd.getDate() + sub.gracePeriodDays);

      if (now <= graceEnd) {
        if (sub.status !== "GRACE") {
          sub.status = "GRACE";
          await restaurant.save();
        }
        continue;
      }

      // 🔴 Fully Expired
      if (sub.status !== "DISABLED") {
        sub.status = "DISABLED";
        await restaurant.save();
      }
    }

    console.log("✅ Subscription cron job completed");
  } catch (error) {
    console.error("❌ Subscription cron error:", error);
  }
});
