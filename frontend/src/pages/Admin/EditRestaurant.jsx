import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload, Save } from "lucide-react";

export default function EditRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "",
    address: "",
    contact: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [restaurantImg, setRestaurantImg] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch restaurant by ID
  const loadRestaurant = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/restaurants/${id}`
      );

      const data = res.data.restaurant;

      setForm({
        name: data.name,
        type: data.type || "",
        address: data.address || "",
        contact: data.contact || "",
      });

      setPreviewImage(data.restaurantImg || "");
    } catch (error) {
      console.error("Error loading restaurant:", error);
      alert("Restaurant not found!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurant();
  }, []);

  // Handle text fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRestaurantImg(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Submit update form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("address", form.address);
    formData.append("contact", form.contact);

    if (restaurantImg) {
      formData.append("restaurantImg", restaurantImg);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/v1/restaurants/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Restaurant updated successfully!");
      navigate("/admin/restaurant");
    } catch (error) {
      console.error(error);
      alert("Error updating restaurant");
    }
  };

  if (loading)
    return (
      <p className="text-center py-10 text-lg font-medium">
        Loading restaurant...
      </p>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Save className="text-orange-600" /> Edit Restaurant
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-gray-700 font-medium">Restaurant Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mt-1 bg-gray-50"
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-gray-700 font-medium">Type</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="Veg / Non-Veg"
              className="w-full p-3 border rounded-lg mt-1 bg-gray-50"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-gray-700 font-medium">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded-lg mt-1 bg-gray-50"
            ></textarea>
          </div>

          {/* Contact */}
          <div>
            <label className="text-gray-700 font-medium">Contact Number</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 bg-gray-50"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-gray-700 font-medium flex items-center gap-2">
              <Upload className="text-blue-600" /> Restaurant Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />

            {previewImage && (
              <img
                src={previewImage}
                alt="preview"
                className="w-40 h-32 object-cover rounded-lg mt-3 shadow"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg font-semibold transition"
          >
            Update Restaurant
          </button>
        </form>
      </div>
    </div>
  );
}
