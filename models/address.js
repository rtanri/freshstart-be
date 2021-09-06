const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  addressType: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  itemLimit: {
    type: Number,
  },
  deliveryType: {
    type: String,
  },
});

module.exports = mongoose.model("address", addressSchema);
