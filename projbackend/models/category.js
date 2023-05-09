const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
    },
  },
  { timestamps: true }
); // it will makd sure that whenever i am making a new entry with this schema, it records the created time and store it in the database

module.exports = mongoose.model("Category", categorySchema);
