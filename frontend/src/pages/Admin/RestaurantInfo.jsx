import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../../redux/restaurantSlice";

export default function RestaurantInfo() {
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  if (loading)
    return <p className="p-4 text-lg font-semibold animate-pulse">Loading...</p>;

  if (error)
    return <p className="p-4 text-red-500 text-lg font-semibold">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurant Info</h1>

      {list.length === 0 ? (
        <p>No restaurant data found.</p>
      ) : (
        list.map((item) => (
          <div
            key={item._id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all mb-4"
          >
            <h2 className="text-xl font-semibold text-blue-600">{item.name}</h2>
            <p className="text-gray-700 mt-1">{item.address}</p>
            <p className="text-gray-800 font-medium mt-2">📞 {item.phone}</p>
          </div>
        ))
      )}
    </div>
  );
}
