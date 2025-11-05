// src/pages/Menu.jsx
import React from "react";

const items = [
 // 🌮 Starters
  {
    category: "Starters",
    name: "Crispy Calamari",
    price: "$18.50",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
  },
  {
    category: "Starters",
    name: "Bruschetta",
    price: "$12.00",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
  {
    category: "Starters",
    name: "Garlic Butter Prawns",
    price: "$16.00",
    img: "https://images.unsplash.com/photo-1617196034796-73dfdd2a9b49",
  },
  {
    category: "Starters",
    name: "Cheese Stuffed Mushrooms",
    price: "$13.50",
    img: "https://images.unsplash.com/photo-1625938142383-1b830a83e2d9",
  },
  {
    category: "Starters",
    name: "Chicken Wings",
    price: "$15.00",
    img: "https://images.unsplash.com/photo-1606755962773-0f04f0b3f6d9",
  },
  {
    category: "Starters",
    name: "Veg Spring Rolls",
    price: "$10.00",
    img: "https://images.unsplash.com/photo-1601050690597-9796e8d0b99c",
  },

  // 🍝 Main Courses
  {
    category: "Main Courses",
    name: "Filet Mignon",
    price: "$32.00",
    img: "https://images.unsplash.com/photo-1606756790138-8a36a2d2e33d",
  },
  {
    category: "Main Courses",
    name: "Butter Chicken",
    price: "$22.00",
    img: "https://images.unsplash.com/photo-1603898037225-8494e1f08358",
  },
  {
    category: "Main Courses",
    name: "Grilled Salmon",
    price: "$28.00",
    img: "https://images.unsplash.com/photo-1604908177225-d4f5f63be0f2",
  },
  {
    category: "Main Courses",
    name: "Mutton Rogan Josh",
    price: "$25.50",
    img: "https://images.unsplash.com/photo-1625938142383-1b830a83e2d9",
  },
  {
    category: "Main Courses",
    name: "Beef Steak",
    price: "$29.00",
    img: "https://images.unsplash.com/photo-1600891963939-997e3a6932b8",
  },
  {
    category: "Main Courses",
    name: "Vegetable Biryani",
    price: "$18.00",
    img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
  },
  {
    category: "Main Courses",
    name: "Paneer Tikka Masala",
    price: "$20.00",
    img: "https://images.unsplash.com/photo-1626075863384-56f10bdb63b0",
  },

  // 🍰 Desserts
  {
    category: "Desserts",
    name: "Chocolate Cutlet",
    price: "$22.00",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    category: "Desserts",
    name: "Cheesecake",
    price: "$14.00",
    img: "https://images.unsplash.com/photo-1605475128023-917ac3d64b5b",
  },
  {
    category: "Desserts",
    name: "Gulab Jamun",
    price: "$10.00",
    img: "https://images.unsplash.com/photo-1617196034796-73dfdd2a9b49",
  },
  {
    category: "Desserts",
    name: "Tiramisu",
    price: "$16.00",
    img: "https://images.unsplash.com/photo-1599785209707-28e0f64f0e0a",
  },
  {
    category: "Desserts",
    name: "Brownie Sundae",
    price: "$18.00",
    img: "https://images.unsplash.com/photo-1606312619070-d18ed3a8dcb3",
  },
  {
    category: "Desserts",
    name: "Rasmalai",
    price: "$12.00",
    img: "https://images.unsplash.com/photo-1617627053519-814bf92f9fdb",
  },

  // 🍹 Drinks
  {
    category: "Drinks",
    name: "Mango Lassi",
    price: "$8.00",
    img: "https://images.unsplash.com/photo-1587017539504-67cf0d13bc1b",
  },
  {
    category: "Drinks",
    name: "Lemon Mojito",
    price: "$9.00",
    img: "https://images.unsplash.com/photo-1576402187878-974f70c890a5",
  },
  {
    category: "Drinks",
    name: "Cold Coffee",
    price: "$7.50",
    img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
  },
  {
    category: "Drinks",
    name: "Orange Juice",
    price: "$6.00",
    img: "https://images.unsplash.com/photo-1570197788417-0e82375c937d",
  },
  {
    category: "Drinks",
    name: "Coca-Cola",
    price: "$5.00",
    img: "https://images.unsplash.com/photo-1587202372775-e229f172b98c",
  },
  {
    category: "Drinks",
    name: "Iced Tea",
    price: "$7.00",
    img: "https://images.unsplash.com/photo-1629117089374-c1b5c0b5a3d4",
  },
];

const Menu = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-[#0f172a]/70 border border-yellow-600 rounded-2xl shadow-lg hover:scale-105 hover:shadow-yellow-500/30 transition transform duration-300"
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-yellow-400">
              {item.name}
            </h3>
            <p className="text-gray-300">{item.category}</p>
            <p className="text-yellow-300 font-bold mt-2">{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
