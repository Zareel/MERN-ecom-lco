const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductsInTheCartSchema = mongoose.Schema(
  {
    // this schema is based on the previously created productSchema
    product: {
      type: ObjectId,
      ref: "Product",
    },
    // what you really want to see in the cart 👇
    name: String,
    count: Number,
    price: Number,
  },
  { timestapms: true }
);

const productsInTheCart = mongoose.model(
  "ProductsInTheCart",
  ProductsInTheCartSchema
);

const orderSchema = new mongoose.Schema(
  {
    // below array is of the products in the cart
    products: [ProductsInTheCartSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    updated: Date, // updated by the admin.
    user: {
      type: ObjectId,
      ref: User,
    },
  },
  { timestapms: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, productsInTheCart };
