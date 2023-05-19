const dotenv = require("dotenv");
const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

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

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`<h1>This is homepage</h1>`);
});
// ====================================================================
const isAdmin = (req, res) => {
  console.log("isAdmin is running");
};
const admin = (req, res) => {
  return res.send("This is admin dashboard");
};
app.get("/admin", isAdmin, admin);
// ========================================================================

const isLoggedIn = (req, res) => {
  console.log("logged in 😃");
};
const login = (req, res) => {
  return res.send("You are logged in");
};
app.get("/login", isLoggedIn, login);
//========================================================================

app.get("/signout", (req, res) => {
  res.send(`You are singed out`);
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running at PORT: ${PORT}`);
});
