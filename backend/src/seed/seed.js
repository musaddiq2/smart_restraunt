import Subscription from "../models/SubscriptionManagement.js";

await Subscription.create({
  restaurant: "RESTAURANT_ID_HERE",
  planName: "Pro Plan",
  billingCycle: "MONTHLY",
  price: 999,
  features: {
    maxTables: 25,
    maxOrdersPerDay: 500,
    analyticsAccess: true,
  },
  expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
});
