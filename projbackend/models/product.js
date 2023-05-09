const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: 1000,
    },
    price: {
      tipe: Number,
      trim: true,
      required: true,
      maxLength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photos: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
