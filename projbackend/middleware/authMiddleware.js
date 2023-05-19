const mongoose = require("mongoose");

export const isAdmin = async (req, res, next) => {
  console.log("isAdmin is running");
  next();
};
