import { useAppContext } from "../context/AppContext";

export default function FoodCard({ food }) {
  const { addToCart } = useAppContext();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="w-full h-56 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
        <p className="text-gray-500 text-sm">{food.category}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-pink-600 font-semibold text-lg">
            ₹{food.price}
          </span>
          <button
            onClick={() => addToCart(food)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}
