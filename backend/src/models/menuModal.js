import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant", // connects menu items to a restaurant
      required: true,
    },
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      // enum: ["Starters", "Main Course", "Desserts", "Beverages", "Others"],

      enum : [ "All",
  "Starters / Appetizers",
  "Soups",
  "Salads",
  "Main Course - Veg",
  "Main Course - Non Veg",
  "Breads",
  "Rice & Biryani",
  "Chinese",
  "Fast Food",
  "Pizzas",
  "Burgers",
  "Sandwiches",
  "Pasta",
  "Combo Meals",
  "Desserts",
  "Ice Creams",
  "Beverages",
  "Milkshakes",
  "Fresh Juices",
  "Snacks",
  "Others"],
      default: "Others",
    },
    image: {
      type: String, // Cloudinary URL
      required: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot be above 5"],
    },
    // veg: {
    //   type: Boolean,
    //   default: true,
    // },
  }
  // { timestamps: true }
);

const menuModal = mongoose.model("MenuItem", MenuItemSchema);
export default menuModal;
