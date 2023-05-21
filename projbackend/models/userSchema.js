import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlenght: [32, "Name must be less than 32 chars"],
      trim: true,
    },
    lastName: {
      type: String,
      maxlenght: [32, "Last name must be less than 32 chars"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLenght: [8, "Password must be atleast 8 chars"],
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
    purchases: {
      type: Array,
      default: [],
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
