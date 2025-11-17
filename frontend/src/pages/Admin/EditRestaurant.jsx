import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosClient"; // your axios instance

export default function EditRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Fetch restaurant data on mount
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`/restaurants/${id}`, { withCredentials: true });
        const data = res.data;
        setFormData({
          restaurantId: data.restaurantId,
          name: data.name,
          contact: data.contact,
          type: data.type,
          address: data.address,
          openingTime: data.openingTime,
          closingTime: data.closingTime,
        });
        setPreviewImg(data.restaurantImgUrl || null); // Existing image URL
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.response?.data?.message || "Failed to fetch restaurant data",
          icon: "error",
        });
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("restaurantImg", image);

    try {
      await axios.put(`/restaurants/update/${id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "✅ Restaurant Updated Successfully!",
        text: "Your restaurant details have been updated.",
        icon: "success",
        confirmButtonColor: "#ff7043",
      });

      navigate("/admin/restaurants");
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Failed to update restaurant",
        icon: "error",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex justify-center items-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10 border border-orange-200 animate-fadeIn">

        <h1 className="text-4xl font-bold text-orange-600 text-center mb-8">
          🍽 Edit Restaurant
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Restaurant Name */}
          <div className="col-span-2">
            <label className="font-semibold text-gray-700">Restaurant Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: The Spice House"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Restaurant ID */}
          <div>
            <label className="font-semibold text-gray-700">Restaurant ID</label>
            <input
              type="text"
              name="restaurantId"
              value={formData.restaurantId}
              readOnly
              className="w-full mt-1 px-4 py-3 rounded-xl border bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="font-semibold text-gray-700">Restaurant Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="Ex: +91 9876543210"
              className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Type */}
          <div>
            <label className="font-semibold text-gray-700">Restaurant Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 rounded-xl border bg-white focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Type</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Veg & Non-Veg">Veg & Non-Veg</option>
            </select>
          </div>

          {/* Opening Time */}
          <div>
            <label className="font-semibold text-gray-700">Opening Time</label>
            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Closing Time */}
          <div>
            <label className="font-semibold text-gray-700">Closing Time</label>
            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="font-semibold text-gray-700">Full Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Complete restaurant address"
              className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* Image */}
          <div className="col-span-2">
            <label className="font-semibold text-gray-700">Restaurant Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />

            {previewImg && (
              <img
                src={previewImg}
                className="w-40 h-40 mt-3 rounded-xl shadow-md border object-cover"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-105"
          >
            {loading ? "Updating..." : "Update Restaurant"}
          </button>

        </form>
      </div>
    </div>
  );
}
