import React, { useState, useRef } from "react";
import { Store, Clock, MapPin, Phone, CloudUpload, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddRestaurantModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    restaurantId: "",
    name: "",
    contact: "",
    type: "",
    address: "",
    openingTime: "",
    closingTime: "",
  });

  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Auto-generate Restaurant ID
  const generateRestaurantId = (name) => {
    if (!name || name.length < 2) return "";
    const prefix = name.substring(0, 2).toUpperCase();
    const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
    return prefix + randomChars;
  };

  // Image handling logic
  const handleImageSelection = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreviewImg(URL.createObjectURL(file));
    } else {
      toast.error("File must be an image (jpg, png, etc.)");
    }
  };

  const handleImageChange = (e) => handleImageSelection(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0)
      handleImageSelection(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeImage = () => {
  };

  const triggerFileInput = () => fileInputRef.current.click();
  // Handle input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const autoID = generateRestaurantId(value);
      setFormData((prev) => ({ ...prev, restaurantId: autoID, name: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("restaurantImg", image);

    const token = localStorage.getItem("token");

    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/restaurant/add`;

    try {
      await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("🎉 Restaurant Added Successfully!");
      onSuccess(); // refresh + close modal
    } catch (error) {
      toast.error(
        error.response?.data?.message || "❌ Failed to add restaurant"
      );
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] px-4">
      {/* MODAL BOX */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 relative max-h-[90vh] overflow-y-auto border border-orange-200">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200"
        >
          <X size={20} />
        </button>

        {/* HEADER */}
        <header className="text-center mb-6">
          <Store className="text-4xl text-orange-600 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-slate-800">Add New Restaurant</h1>
          <p className="text-slate-500 text-sm">
            Fill in the details below to add a new restaurant.
          </p>
        </header>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ex: The Spice House"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 
              focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
            />
          </div>

          {/* Auto-ID */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Restaurant ID (Auto)
            </label>
            <input
              type="text"
              name="restaurantId"
              value={formData.restaurantId}
              readOnly
              className="w-full px-4 py-3 rounded-xl border bg-orange-100/50 
              font-mono text-orange-800 cursor-not-allowed"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              <Phone size={16} className="mr-1 text-orange-500" />
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="Ex: +91 9876543210"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 
              focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Restaurant Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 
              focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Type</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Veg & Non-Veg">Veg & Non-Veg</option>
            </select>
          </div>

          {/* Opening */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Opening Time
            </label>
            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 
              focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Closing */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Closing Time
            </label>
            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50
              focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              required
              onChange={handleChange}
              rows="3"
              placeholder="Enter restaurant full address"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50
              focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Restaurant Image
            </label>

            {previewImg ? (
              <div className="relative w-full h-40 rounded-xl border-2 border-orange-300/50 shadow-inner">
                <img
                  src={previewImg}
                  alt="Restaurant Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow text-red-500 hover:bg-red-100"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center p-8 text-center rounded-xl
                border-2 border-dashed h-40 transition-all ${
                  isDragging
                    ? "border-orange-500 bg-orange-100/50"
                    : "border-slate-300 bg-slate-50 hover:border-orange-400"
                }`}
              >
                <CloudUpload size={32} className="text-slate-500 mb-2" />
                <p className="text-sm text-slate-600 mb-1">
                  Drag & drop image here or{" "}
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="text-orange-600 font-semibold underline"
                  >
                    choose file
                  </button>
                </p>
                <p className="text-xs text-slate-400">JPG or PNG up to 5MB</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 py-3 rounded-xl text-white font-semibold shadow-md flex items-center justify-center text-lg mt-4
              ${loading ? "bg-orange-400" : "bg-orange-600 hover:bg-orange-700"}`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Adding...
              </>
            ) : (
              "Add Restaurant"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
