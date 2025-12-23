import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { createTable, updateTable } from "../../../../redux/slices/tableSlice";

Modal.setAppElement("#root");

export default function AddTablePage({
  isOpen,
  onClose,
  editData,
  onSuccess,
  selectedRestaurantData,
}) {
  const dispatch = useDispatch();

  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    if (editData) {
      setTableNumber(editData.tableNumber);
      setCapacity(editData.seats);
    } else {
      setTableNumber("");
      setCapacity("");
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tableNumber || !capacity) return alert("All fields are required");

    const tableData = {
      tableNumber,
      seats: Number(capacity),
      restaurantId: selectedRestaurantData._id,
      status: editData?.status || "Available",
      // ❗ tableId removed — backend generates it
    };

    try {
      if (editData) {
        await dispatch(updateTable({ id: editData._id, data: tableData }));
      } else {
        await dispatch(createTable(tableData));
      }

      onClose();
      onSuccess && onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error saving table");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="rounded-xl p-7 w-full max-w-md mx-auto shadow-xl 
                 bg-[#fdf8f3] border border-[#f4d7d0] 
                 backdrop-blur-xl animate-fadeIn"
      overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.25)] 
                        backdrop-blur-md flex justify-center items-center z-50"
    >
      <div className="flex items-center gap-4 mb-5 border p-3 rounded-lg bg-white shadow-sm">
        <img
          src={selectedRestaurantData?.image}
          alt=""
          className="w-14 h-14 rounded-lg object-cover border"
        />
        <div>
          <h3 className="text-lg font-semibold text-[#8a4b55]">
            {selectedRestaurantData?.name}
          </h3>
          <p className="text-xs text-gray-600">ID: {selectedRestaurantData?._id}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-[#8a4b55] mb-4">
        {editData ? "Edit Table" : "Add New Table"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="border border-[#e8c7c1] p-3 rounded-lg bg-white 
                     focus:border-[#d3919e] transition shadow-sm"
          required
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="border border-[#e8c7c1] p-3 rounded-lg bg-white 
                     focus:border-[#d3919e] transition shadow-sm"
          required
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-[#d7b4ae] text-[#8a4b55]
                       hover:bg-[#f4e4df] transition font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r 
                       from-[#d3919e] to-[#b96c7b]
                       text-white shadow-md hover:shadow-lg transition font-medium"
          >
            {editData ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
