import React from "react";

export default function menuSections() {
  const DishCard = ({ img, title, desc, price }) => (
    <div className="dish-card bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2">
      <img
        src={img}
        alt={title}
        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
      />
      <div className="p-5 text-center">
        <h3 className="text-2xl font-semibold mb-2 text-green-700">{title}</h3>
        <p className="text-gray-600 mb-3">{desc}</p>
        <p className="text-lg font-bold text-gray-900 mb-4">₹{price}</p>
        <button className="order-btn bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition">
          Order Now
        </button>
      </div>
    </div>
  );

  return (
    <section className="portfolio-section bg-gradient-to-b from-sky-200 via-cyan-200 to-sky-100 py-20 px-10">
      {/* 🥘 Biryani Section */}
      <div className="fade-up section-biryani mb-16">
        <h2 className="section-title text-3xl font-bold text-center mb-10 text-green-700">
          🥘 Special Biryani
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <DishCard
            img="/smart_restraunt/frontend/src/assets/Hyderabadi Biryani.jpg"
            title="Hyderabadi Biryani"
            desc="Fragrant rice layered with juicy marinated chicken and spices."
            price="299"
          />
          <DishCard
            img="/smart_restraunt/frontend/src/assets/Mutton Dum Biryani.jpg"
            title="Mutton Dum Biryani"
            desc="Slow-cooked mutton and saffron rice infused with royal flavors."
            price="349"
          />
          <DishCard
            img="/smart_restraunt/frontend/src/assets/Egg Biryani.jpg"
            title="Egg Biryani"
            desc="Soft-boiled eggs over basmati rice cooked with spicy masala."
            price="249"
          />
        </div>
      </div>

      {/* 🥦 Veg Section */}
      <div className="fade-up section-veg mb-16">
        <h2 className="section-title text-3xl font-bold text-center mb-10 text-green-700">
          🥦 Special Veg Items
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <DishCard
            img="/smart_restraunt/frontend/src/assets/Paneer Butter Masala.jpg"
            title="Paneer Butter Masala"
            desc="Soft paneer cubes in creamy, buttery tomato gravy."
            price="229"
          />
          <DishCard
            img="https://images.unsplash.com/photo-1625948967270-b26e9e0a5df3?w=800"
            title="Veg Handi"
            desc="Mixed vegetables cooked in a rich traditional curry."
            price="199"
          />
          <DishCard
            img="https://images.unsplash.com/photo-1626198044667-4d89c2b0ccbd?w=800"
            title="Malai Kofta"
            desc="Delicious dumplings in a cashew-cream sauce."
            price="249"
          />
        </div>
      </div>
    </section>
  );
}
