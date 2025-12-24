import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Store,
  Clock,
  MapPin,
  Phone,
  CloudUpload,
  X,
  Loader2,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

export default function EditRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
   const [formData, setFormData] = useState({
    restaurantId: "",
    name: "",
    type: "",
    address: "",
    openingTime: "",
    closingTime: "",
    email: "",
    status: "Active",
  });

  const [previewImg, setPreviewImg] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fileInputRef = useRef(null);

  // Fetch existing restaurant
  const fetchRestaurant = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      const data = res.data?.restaurant || res.data?.data || res.data;

      setFormData({
        restaurantId: data.restaurantId || "",
        name: data.name || "",
        contact: data.contact || "",
        type: data.type || "",
        address: data.address || "",
        openingTime: data.openingTime || "",
        closingTime: data.closingTime || "",
        email: data.email || "",
        status: data.status || "Active",
      });

      setPreviewImg(data.restaurantImg || data.image || "");
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load restaurant");
      navigate("/admin/restaurants");
    }
  };

  useEffect(() => {
    fetchRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // image handling
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreviewImg(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image");
    }
  };

  const chooseFile = () => fileInputRef.current?.click();

  const removeImage = () => {
    setImage(null);
    setPreviewImg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("address", form.address);
    formData.append("contact", form.contact);

    try {
      await axios.put(`${BASE_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      toast.success("Restaurant updated successfully");

      setTimeout(() => {
        navigate("/admin/restaurant-management");
      }, 600);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to update restaurant"
      );
    }

    try {
  const API_URL = import.meta.env.VITE_API_URL;

  await axios.put(
    `${API_URL}/restaurant/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
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
      <div className="flex justify-center py-20 text-lg text-rose-600">
        Loading restaurant details…
      </div>
    );

  return (
    <div className="min-h-screen bg-orange-50/50 py-10 px-4 flex justify-center">
      <ToastContainer position="top-center" />

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-orange-200">
        <header className="text-center mb-8">
          <Store className="text-5xl text-orange-600 mx-auto mb-3" />
          <h1 className="text-3xl font-extrabold text-slate-800">
            Edit Restaurant
          </h1>
          <p className="text-slate-500 text-sm">
            Update restaurant details & information.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* READING ONLY ID */}
          <div>
            <label className="block text-sm mb-1">Restaurant ID</label>
            <input
              type="text"
              value={formData.restaurantId}
              readOnly
              className="w-full bg-slate-100 border border-slate-300 px-4 py-3 rounded-xl text-sm cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              required
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm mb-1">Restaurant Type</label>
            <select
              name="type"
              value={formData.type}
              required
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Veg & Non-Veg">Veg & Non-Veg</option>
            </select>
          </div>

          {/* Opening Time */}
          <div>
            <label className="block text-sm mb-1 flex items-center gap-1">
              <Clock size={16} /> Opening Time
            </label>
            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              required
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Closing Time */}
          <div>
            <label className="block text-sm mb-1 flex items-center gap-1">
              <Clock size={16} /> Closing Time
            </label>
            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              required
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-1 flex items-center gap-1">
              <MapPin size={16} /> Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              required
              onChange={handleChange}
              rows={3}
              className="w-full border px-4 py-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Restaurant Image
            </label>

            {previewImg ? (
              <div className="relative h-40 border rounded-xl overflow-hidden shadow">
                <img
                  src={previewImg}
                  alt="preview"
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div
                onClick={chooseFile}
                className="h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:border-orange-500"
              >
                <CloudUpload size={32} />
                <p className="text-sm mt-2">Click or Drop Image Here</p>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`md:col-span-2 py-3 rounded-xl text-white font-semibold flex justify-center items-center gap-2 mt-2 ${
              loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Updating...
              </>
            ) : (
              "Update Restaurant"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
