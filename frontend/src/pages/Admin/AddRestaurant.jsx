import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { useDropzone } from "react-dropzone";



export default function AddRestaurantModal({ open, onClose, onSuccess, restaurant }) {
  const API = `${import.meta.env.VITE_API_URL}/restaurant`;
  const modalRef = useRef(null);
  const formRef = useRef(null);


  const generateRestaurantId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "RST-";
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const [form, setForm] = useState({
    restaurantId: "",
    name: "",
    contact: "",
    email: "",
    type: "Veg",
    address: "",
    openingTime: "",
    closingTime: "",
    status: "Active",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => setImage(acceptedFiles[0]),
  });

  // Populate form for edit or generate ID for new
  useEffect(() => {
    if (!modalRef.current) return;
    const el = modalRef.current;
    if (open) {
      gsap.fromTo(el, { autoAlpha: 0, y: 30, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" });
      gsap.fromTo(formRef.current, { x: -20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.35, delay: 0.05 });

      if (restaurant) setForm({ ...restaurant });
      else setForm((prev) => ({ ...prev, restaurantId: generateRestaurantId() }));
    } else {
      gsap.to(el, { autoAlpha: 0, y: 20, scale: 0.98, duration: 0.2, ease: "power3.in" });
    }
  }, [open, restaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach((k) => data.append(k, form[k]));
      if (image) data.append("restaurantImg", image);

      if (restaurant?._id) {
        await axios.put(`${API}/${restaurant._id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await axios.post(`${API}/add`, data, { headers: { "Content-Type": "multipart/form-data" } });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving restaurant:", error);
      alert("Failed to save restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div ref={formRef} className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">{restaurant ? "Edit Restaurant" : "Add Restaurant"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-2 rounded-full transition-colors" aria-label="close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="restaurantId" placeholder="Restaurant ID (auto or custom)" value={form.restaurantId} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none transition" />
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none transition" />
          <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none transition" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none transition" />
          <select name="type" value={form.type} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none transition">
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Both">Both</option>
          </select>
          <select name="status" value={form.status} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none transition">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} rows={3} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none md:col-span-2 transition" />

          <div className="flex gap-2 items-center md:col-span-2">
            <input type="time" name="openingTime" value={form.openingTime} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none transition" />
            <input type="time" name="closingTime" value={form.closingTime} onChange={handleChange} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none transition" />
          </div>

          <div {...getRootProps()} className={`md:col-span-2 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${isDragActive ? "border-rose-500 bg-rose-50" : "border-gray-300 bg-gray-50"}`}>
            <input {...getInputProps()} />
            {image ? <img key={image.name} src={URL.createObjectURL(image)} alt="preview" className="mx-auto h-32 object-contain rounded-lg" /> : <p className="text-gray-500">{isDragActive ? "Drop the image here..." : "Drag & drop image here or click to choose"}</p>}
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition">{loading ? "Saving..." : restaurant ? "Update Restaurant" : "Add Restaurant"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
