// run with: node src/seed/seed.js (ensure MONGO_URI set)
require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');

  const r = await Restaurant.create({
    name: 'The Grand Hotel',
    address: '123 Main St',
    coords: { lat: 12.9716, lng: 77.5946 },
    contact: '+91-1234567890'
  });

  const items = [
    { restaurantId: r._id, name: 'Signature Eggs Benedict', price: 12.5, category: 'Breakfast', description: 'Poached eggs, hollandaise, sourdough' },
    { restaurantId: r._id, name: 'Masala Omelette', price: 9.0, category: 'Breakfast' },
    { restaurantId: r._id, name: 'Herb Crusted Salmon', price: 22.0, category: 'Mains' },
    { restaurantId: r._id, name: 'Hyderabadi Biryani (Chef Special)', price: 18.5, category: 'Mains' },
    { restaurantId: r._id, name: 'Gulab Jamun Cheesecake', price: 8.0, category: 'Desserts' }
  ];

  await MenuItem.insertMany(items);
  console.log('Seed complete: restaurant + menu items created.');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
