const dotenv = require("dotenv");
const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

//configure dotenv
dotenv.config();

mongoose
  .connect(process.env.DATABSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // help us to keep our database connection alive
    useCreateIndex: true,
  })
  .then(() => {
    console.log("db connected");
  });

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Server is up and running</h1>`);
});

app.get("/signout", (req, res) => {
  res.send(`You are singed out`);
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running at PORT: ${PORT}`);
});
