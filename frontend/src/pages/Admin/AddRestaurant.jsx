import React, { useState, useRef } from "react";
import { Store, Clock, MapPin, Phone, CloudUpload, X, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios"; // FIX: Changed to direct axios import for single-file environment

export default function AddRestaurant() {
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
  const [isDragging, setIsDragging] = useState(false); // State for drag-drop visual feedback
  const fileInputRef = useRef(null); // Ref to trigger file input click

  // Auto-generate Restaurant ID (Improved to 8 digits/chars)
  const generateRestaurantId = (name) => {
    if (!name || name.length < 2) return "";
    const prefix = name.substring(0, 2).toUpperCase();
    // Generate 6 random alphanumeric characters
    const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase(); 
    return prefix + randomChars; // 8 total characters/digits
  };

  // 🧠 Image Handling Logic
  const handleImageSelection = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreviewImg(URL.createObjectURL(file));
    } else {
      toast.error("File must be an image type (jpg, png, etc.)", { position: "top-center" });
    }
  };

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleImageSelection(file);
  };
  
  // Handle drag and drop events
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageSelection(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Function to remove image
  const removeImage = () => {
    setImage(null);
    setPreviewImg(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };
  
  // Function to trigger file input click via link
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };


  // Handle input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-generate ID when restaurant name is typed
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

    // NOTE: In a real environment, you should use the token from state/context
    const token = localStorage.getItem("token"); 
    const apiKey = ""; // API Key placeholder as per instructions
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"}/restaurants/add`;


    try {
      await axios.post(apiUrl, data, {
        headers: { 
            "Content-Type": "multipart/form-data", 
            Authorization: `Bearer ${token}` 
        },
      });

      // Using toast for success notification
      toast.success("🎉 Restaurant Added Successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });

      // Reset form
      setFormData({
        restaurantId: "",
        name: "",
        contact: "",
        type: "",
        address: "",
        openingTime: "",
        closingTime: "",
      });

      setImage(null);
      setPreviewImg(null);

    } catch (error) {
      // Using toast for error notification
      toast.error(error.response?.data?.message || "❌ Failed to add restaurant", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }

    setLoading(false);
  };

  return (
    // Updated background for consistency with dashboard
    <div className="min-h-screen bg-orange-50/50 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 sm:p-10 border border-orange-200">

        {/* Header Section */}
        <header className="text-center mb-8">
            <Store className="text-5xl text-orange-600 mx-auto mb-3" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                Register New Restaurant
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
                Enter details to onboard a new restaurant partner.
            </p>
        </header>


        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Restaurant Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Restaurant Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: The Spice House"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 
                         focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition shadow-sm"
            />
          </div>

          {/* Auto Restaurant ID */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Restaurant ID (Auto)</label>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    name="restaurantId"
                    value={formData.restaurantId}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-orange-100/50 
                                cursor-not-allowed font-mono text-sm text-orange-800"
                />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Phone size={16} className="mr-1 text-orange-500" />
                Restaurant Contact
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="Ex: +91 9876543210"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 
                         focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition shadow-sm"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Restaurant Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 
                         focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition shadow-sm"
            >
              <option value="">Select Type</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Veg & Non-Veg">Veg & Non-Veg</option>
            </select>
          </div>

          {/* Opening Time */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Clock size={16} className="mr-1 text-orange-500" />
                Opening Time
            </label>
            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 
                         focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition shadow-sm"
            />
          </div>

          {/* Closing Time */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Clock size={16} className="mr-1 text-orange-500" />
                Closing Time
            </label>
            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 
                         focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition shadow-sm"
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <MapPin size={16} className="mr-1 text-orange-500" />
                Full Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Complete restaurant address"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 
                         focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition shadow-sm"
            ></textarea>
          </div>

          {/* Image Upload Section (Drag & Drop) */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Restaurant Image</label>

            {previewImg ? (
                // Image Preview State
                <div className="relative w-full h-40 rounded-xl shadow-inner border-2 border-orange-300/50">
                    <img
                      src={previewImg}
                      alt="Restaurant Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg text-red-500 hover:bg-red-100 transition"
                        aria-label="Remove image"
                    >
                        <X size={20} />
                    </button>
                </div>
            ) : (
                // Drag & Drop / File Selection State
                <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center p-6 sm:p-10 text-center rounded-xl transition-all h-40
                                border-2 border-dashed ${isDragging ? 'border-orange-500 bg-orange-100/50' : 'border-slate-300 bg-slate-50/50 hover:border-orange-400'}`}
                >
                    <CloudUpload size={32} className={`mb-2 ${isDragging ? 'text-orange-600' : 'text-slate-400'}`} />
                    <p className="text-sm text-slate-600 mb-1">
                        Drag & drop your image here, or 
                        <button 
                            type="button" 
                            onClick={triggerFileInput} 
                            className="text-orange-600 font-semibold hover:text-orange-700 ml-1 underline"
                        >
                            Choose file
                        </button>
                    </p>
                    <p className="text-xs text-slate-400">JPG or PNG (max 5MB)</p>
                </div>
            )}
            
            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden" // Keep hidden
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            // Primary action button styling
            className={`col-span-2 py-3 rounded-xl text-white font-semibold shadow-md transition-all duration-200 
                        flex items-center justify-center space-x-2 text-lg mt-4
                        ${
                            loading
                                ? "bg-orange-400 cursor-not-allowed"
                                : "bg-orange-600 hover:bg-orange-700 active:bg-orange-800 shadow-orange-500/30"
                        }`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <span>Add Restaurant</span>
            )}
          </button>
        </form>
        
        <ToastContainer />
      </div>
    </div>
  );
}