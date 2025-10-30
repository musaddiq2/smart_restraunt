// src/services/restaurantService.js
const Restaurant = require('../models/Restaurant');

exports.createRestaurant = (data) => Restaurant.create(data);

exports.getRestaurants = async ({ page = 1, limit = 10, filters = {}, sort = '-createdAt' }) => {
  const skip = (page - 1) * limit;
  const total = await Restaurant.countDocuments(filters);
  const results = await Restaurant.find(filters).sort(sort).skip(skip).limit(limit);
  return { success: true, results, pagination: { total, page, limit, pages: Math.ceil(total/limit) } };
};

exports.getRestaurantById = (id) => Restaurant.findById(id);
exports.updateRestaurant = (id, update) => Restaurant.findByIdAndUpdate(id, update, { new: true, runValidators: true });
exports.deleteRestaurant = (id) => Restaurant.findByIdAndDelete(id);
