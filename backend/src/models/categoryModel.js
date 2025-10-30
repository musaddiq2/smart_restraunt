import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    type: { type: String, required: true }, // any value allowed
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
