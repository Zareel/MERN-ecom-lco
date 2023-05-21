import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.DATABASE || "mongodb://127.0.0.1:27017/tshirt",
  JWT_SECRET: process.env.JWT_SECRET || "123456789ASDFGHJKL",
  JWT_EXPIRTY: process.env.JWT_EXPIRTY || "7d",
};

export default config;
