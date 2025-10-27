const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  tableId: { type: String, required: true }, // e.g., 'T1', 'Table-12'
  location: String,
  qrCodeData: String
}, { timestamps: true });

module.exports = mongoose.model('Table', TableSchema);
