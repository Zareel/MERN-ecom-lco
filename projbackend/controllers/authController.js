import User from "../models/userSchema.js";
import { hashPassword } from "../utils/authHelpers.js";

export const signup = async (req, res) => {
  try {
    // get user information
    const { name, lastName, email, password, address } = req.body;
    //validation
    if (!name || !lastName || !email || !password || !address) {
      return res.send({ error: "All the fields are required" });
    }
    //check if the user is existing
    const existingUser = await User.findOne({ email });
    // if the user is existing send a token
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "Already singed us please login",
      });
    }
    // if the user is not existing hash password
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new User({
      name,
      lastName,
      email,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).json({
      success: true,
      message: "User signed up successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in signing up",
      error,
    });
  }
};

export const signout = (req, res) => {
  res.json({
    message: "user has signed out",
  });
};
