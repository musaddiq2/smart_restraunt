import Subscription from "../models/SubscriptionManagement.js";
import dayjs from "dayjs";

export const checkAndDisableExpiredSubscriptions = async () => {
  const now = dayjs();

  const subs = await Subscription.find({ status: "ACTIVE" });

  for (const sub of subs) {
    const graceEnd = dayjs(sub.expiryDate).add(sub.gracePeriodDays, "day");

    if (now.isAfter(graceEnd)) {
      sub.status = "DISABLED";
      await sub.save();
    } else if (now.isAfter(sub.expiryDate)) {
      sub.status = "EXPIRED";
      await sub.save();
    }
  }
};

export const generateInvoiceNumber = () => {
  return `INV-${Date.now()}`;
};
