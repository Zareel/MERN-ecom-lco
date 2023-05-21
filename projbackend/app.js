import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import config from "./config/index.js";

const app = express();

//configure dotenv
dotenv.config();

//db connection
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

//my routes
app.use("/api/v1/auth", authRoutes);

//port
const PORT = config.PORT;

// starting a server
app.get("/", (req, res) => {
  res.send(`<h1>This is homepage</h1>`);
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running at PORT: ${PORT}`);
});
