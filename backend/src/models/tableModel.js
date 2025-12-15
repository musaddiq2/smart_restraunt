<<<<<<< HEAD
=======
// src/models/tableModel.js
>>>>>>> ceb071b784df9ecba6a675cee78975bfde35ff0b
import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    tableNumber: { type: Number, required: true, unique: true },
    seats: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Available", "Booked", "Occupied"],
      default: "Available",
    },

    // ⭐ NEW — For dynamic linking with restaurant
    restaurantId: {
      type: String, // restaurantId from Restaurant model
      default: null,
    },

    restaurantName: {
      type: String, // Auto-filled from restaurant controller
      default: null,
    },

    qrCode: {
      type: String, // Data URL or hosted URL
      default: null,
    },
=======
    tableNumber: { type: Number, required: true },
    seats: { type: Number, required: true },
    status: { type: String, default: "Available" },

    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    tableId: { type: String, unique: true }, // Auto-generated
    menuURL: { type: String }, // QR Menu url
>>>>>>> ceb071b784df9ecba6a675cee78975bfde35ff0b
  },
  { timestamps: true }
);

<<<<<<< HEAD
=======
// Auto-generate tableId + menuURL
tableSchema.pre("save", async function (next) {
  // Only update if new OR restaurant/table number changed
  if (
    !this.isNew &&
    !this.isModified("tableNumber") &&
    !this.isModified("restaurantId")
  )
    return next();

  const Restaurant = mongoose.model("Restaurant");
  const restaurant = await Restaurant.findById(this.restaurantId);

  const namePart =
    restaurant?.name?.replace(/\s+/g, "").toUpperCase() || "RESTAURANT";

  const uniqueId = `${namePart}-${this.restaurantId.toString().slice(0, 6)}-${
    this.tableNumber
  }`;

  this.tableId = uniqueId;

  // Generate QR Menu URL
  this.menuURL = `${process.env.FRONTEND_URL}/menu/${this.restaurantId}/${uniqueId}`;

  next();
});

>>>>>>> ceb071b784df9ecba6a675cee78975bfde35ff0b
export default mongoose.model("Table", tableSchema);
