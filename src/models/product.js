const mongoose = require("mongoose");

//// Code  ////
const productSchema = mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
      minlength: 3,
    },
    productImage: {
      type: String,
      erquired: true,
    },
    priceItemOne: {
      type: Number,
      required: true,
    },
    priceItemTwo: {
      type: Number,
      required: true,
    },
    priceItemThree: {
      type: Number,
      required: true,
    },
    lowestPriceItemOne: {
      type: Number,
    },
    lowestPriceItemTwo: {
      type: Number,
    },
    lowestPriceItemThree: {
      type: Number,
    },
    productsSearch: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
