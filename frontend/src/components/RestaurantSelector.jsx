import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, setSelectedRestaurant } from "../redux/slices/restaurantSlice";

const RestaurantSelector = ({ onSelect }) => {
  const dispatch = useDispatch();
  const { items, loading, selectedRestaurantId } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleChange = (e) => {
    const selected = items.find(r => r._id === e.target.value);
    if (selected) {
      dispatch(setSelectedRestaurant(selected._id));
      if (onSelect) onSelect(selected._id, selected.name); // pass both id & name
    }
  };

  return (
    <div className="w-full mb-4">
      <label className="text-gray-600 font-medium mb-1 block">Select Restaurant</label>

      {loading ? (
        <p>Loading restaurants…</p>
      ) : (
        <select
          className="border p-2 rounded w-full"
          value={selectedRestaurantId || ""}
          onChange={handleChange}
        >
          <option value="">-- Select Restaurant --</option>
          {items?.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default RestaurantSelector;
