import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, setSelectedRestaurant } from "../redux/slices/restaurantSlice";

const RestaurantSelector = () => {
  const dispatch = useDispatch();
  const { items, loading, selectedRestaurantId } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <div className="w-full mb-4">
      <label className="text-gray-600 font-medium">Select Restaurant</label>

      {loading ? (
        <p>Loading restaurants…</p>
      ) : (
        <select
          className="border p-2 rounded w-full"
          value={selectedRestaurantId}
          onChange={(e) => dispatch(setSelectedRestaurant(e.target.value))}
        >
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
