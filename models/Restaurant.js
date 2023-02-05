const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  address: {
    type: Object,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  restaurant_id: {
    type: String,
    required: true
  }
})

RestaurantSchema.query.sortByRestaurantId = function (flag) {
  return this.sort({ 'restaurant_id': flag })
}

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;