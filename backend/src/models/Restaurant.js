const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: String,
  address: String,
  coords: { lat: Number, lng: Number }, // for geofence check
  contact: String
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
